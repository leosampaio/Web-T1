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
            resolve([
                    new CalendarEvent({id: 1,
                        client: new Client({id: 1, name: 'John', email: 'client@mail.com', phone: '555 17 3343'}),
                        pet: new Pet({id: 1, name: 'Auau', image_url: '../img/pet-0.jpg', description: 'Lorem ipsum dolor sit amet'}),
                        service: new Product({id: 1, image_url: "../img/product-0.jpg", name: "Escova para Cães", price: "R$100,00"}),
                        date: Date(),
                        slotid: Math.floor((Math.random() * 10) + 1),
                    }),
                  ]);
            });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new CalendarEvent({id: 1,
                        client: new Client({id: 1, name: 'John', email: 'client@mail.com', phone: '555 17 3343'}),
                        pet: new Pet({id: 1, name: 'Auau', image_url: '../img/pet-0.jpg', description: 'Lorem ipsum dolor sit amet'}),
                        service: new Product({id: 1, image_url: "../img/product-0.jpg", name: "Escova para Cães", price: "R$100,00"}),
                        date: Date(),
                        slotid: Math.floor((Math.random() * 10) + 1),
                    }));
        });
        return p
    }

    static update(id, model) {
        console.log("Updated id " + id + " with: ")
        console.log(model);
    }

    static create(model) {
        console.log("Created new model:")
        console.log(model);
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
                let date = new Date(dateid);
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