'use strict';

class CalendarEvent {
    constructor(properties) {
        this.id = properties.id;
        this.client = properties.client;
        this.pet = properties.pet;
        this.service = properties.service;
        this.date = properties.date;
        this.slotid = properties.slotid;
    }

    static getEventsForDay(day) {
        let p = new Promise((resolve, reject) => {
            let date = dateFromDateID(day);
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["events"]).objectStore("events").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new CalendarEvent(cursor.value);
                    model.id = cursor.key;
                    if (model.date.toDateString() == date.toDateString()) {
                        models.push(cursor.value);
                    }
                    cursor.continue();
                  }
                  else {
                    resolve(models);
                  }
                };
            })
        });
        return p;
    }

    static create(model) {
        let p = new Promise((resolve, reject) => {
            Promise.all([Pet.getByID(model.pet), Product.getByID(model.service)]).then((results) => {
                model.id = this.incrementId();
                model.pet = results[0];
                model.service = results[1];
                model.date = new Date(model.date);
                console.log("Created new model:")
                console.log(model);

                let db = new Database()
                let transaction = db.idb.transaction(["events"], "readwrite");

                transaction.onerror = (event) => {
                  console.error("Something went wrong!", event);
                };

                let objectStore = transaction.objectStore("events");
                let request = objectStore.add(model);
                request.onsuccess = (event) => {
                   resolve();
                };
            });
        });
        return p;
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 1;
        else this.latestId++;
        return this.latestId;
    }

    static getWeekFromNow() {
        let startingDate = new Date()
        let week = [];
        let day = new Date();
        for(let i=0; i<10; i++) {
            day.setDate(startingDate.getDate() + i);
            week.push(this._formattedDate(day));
        }
        return week;
    }

    static delete(id) {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            let transaction = db.idb.transaction(["events"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("events");
            let request = objectStore.delete(id);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static _formattedDate(date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }
}

class DailySummary {
    constructor(properties) {
        this.dateid = properties.dateid;
        this.date = properties.date;
        this.events = properties.events;
        this.slots = properties.slots;
    }

    get formattedDay() {
        return this.date.toISOString().slice(8, 10);
    }

    get formattedMonth() {
        let formatter = new Intl.DateTimeFormat("pt-br", { month: "long" });
        return this.formattedDay + " de " + formatter.format(this.date);
    }

    get nextDateID() {
        let nextDate = this.date;
        nextDate.setDate(nextDate.getDate() + 1);
        return DailySummary._formatDateForID(nextDate);
    }

    get previousDateID() {
        let previousDate = this.date;
        previousDate.setDate(previousDate.getDate() - 1);
        return DailySummary._formatDateForID(previousDate);
    }

    static _formatDateForID(date) {
        return date.toISOString().slice(0, 10);
    }

    static _formatSlotNameFromID(slotid) {
        let slottedTime = 8 + slotid;
        return slottedTime+":00";
    }

    static getDailySummaryForDate(dateid) {
        let p = new Promise((resolve, reject) => {
            CalendarEvent.getEventsForDay(dateid).then((events) => {
                let date = dateFromDateID(dateid);
                let slots = [];
                for (let i = 0; i < 10; i++) {
                    let slot = {};
                    slot.event = events.find((e, index, a) => {
                        return e.slotid == i;
                    })
                    slot.isScheduled = slot.event != null;
                    slot.time = DailySummary._formatSlotNameFromID(i);
                    slots.push(slot);
                }

                let summary = new DailySummary({
                    dateid: dateid,
                    date: date,
                    slots: slots,
                    events: events});
                resolve(summary);
            })
        });
        return p;
    }

    static getDailySummaryForToday() {
        return DailySummary.getDailySummaryForDate(DailySummary._formatDateForID(new Date()));
    }
}

function dateFromDateID(dateid) {
    let date = new Date(dateid)
    date.setHours(date.getHours()+12);
    return date;
}

if (typeof module !== "undefined") {
    module.exports = Admin
}