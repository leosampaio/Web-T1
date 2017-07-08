'use strict';

let Admin = require('../../models/admin.js');
let nano = require('nano')('http://localhost:5984');

class AdminServer extends Admin {

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let adminDB = nano.use('admin');
            adminDB.view('admins', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    console.log(body)
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new Admin(doc.doc);
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
            let adminDB = nano.use('admin');
            adminDB.view('admins', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(body)
                    if (body.rows.length > 0) {
                        let model = new Admin(body.rows[0].doc);
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
            let db = nano.use('admin');
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
        });
        return p;
    }

    static remove(model) {
        let p = new Promise((resolve, reject) => {
            let adminDB = nano.use('admin');
            adminDB.destroy(model._id, model._rev, function(err, body) {
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
            let db = nano.use('admin');
            db.view('admins', 'count', (err, body) => {
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

module.exports = AdminServer