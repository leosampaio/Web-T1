'use strict';

let CalendarEvent = require('../../models/event.js');
let nano = require('nano')('http://localhost:5984');

class CalendarEventServer extends CalendarEvent {
	static getAll() {
        let p = new Promise((resolve, reject) => {
            let EventDB = nano.use('event');
            EventDB.view('events', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new CalendarEvent(doc.doc);
                        models.push(model);
                    });
                    resolve(models);
                }
            });
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            let EventDB = nano.use('event');
            EventDB.view('events', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (body.rows.length > 0) {
                        let model = new CalendarEvent(body.rows[0].doc);
                        resolve(model);
                    } else {
                        reject(404);
                    }
                }
            });
        });
        return p;
    }

    static insert(model) {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('event');
            this.count().then((count) => {
                if (!model.id) {
                    model.id = count + 1;
                }
                db.insert(model, function(err, body) {
                    if (!err) {
                        console.log(body);
                        resolve(model);
                    } else {
                        reject(err);
                    }
                });
            }).catch((err) => {
                reject(err)
            })
        })
        return p;
    }

    static remove(model) {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('event');
            db.destroy(model._id, model._rev, function(err, body) {
                if (!err) {
                    console.log(body);
                    resolve(model);
                } else {
                    reject(err);
                }
            });
        });
        return p;
    }

    static count() {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('event');
            db.view('events', 'count', (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    if (body.rows.length > 0) {
                        resolve(body.rows[0].value.max);
                    } else {
                        resolve(0);
                    }
                }
            });
        });
        return p
    }
} 

module.exports = CalendarEventServer