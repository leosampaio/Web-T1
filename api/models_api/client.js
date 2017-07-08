'use strict';

let Client = require('../../models/client.js');
let nano = require('nano')('http://localhost:5984');

class ClientServer extends Client {

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('client');
            db.view('clients', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new Client(doc.doc);
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
            let db = nano.use('client');
            db.view('clients', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (body.rows.length > 0) {
                        let model = new Client(body.rows[0].doc);
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
            let db = nano.use('client');
            this.count().then((count) => {
                model.id = count+1;
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
        });
        return p;
    }

    static remove(model) {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('client');
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
            let db = nano.use('client');
            db.view('clients', 'count', (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    resolve(body.rows[0].value.max);
                }
            });
        });
        return p
    }
}

module.exports = ClientServer