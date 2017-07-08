'use strict';

let Product = require('../../models/product.js');
let nano = require('nano')('http://localhost:5984');

class ProductServer extends Product {
	static getAll() {
        let p = new Promise((resolve, reject) => {
            let ProductDB = nano.use('product');
            ProductDB.view('products', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new Product(doc.doc);
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
            let ProductDB = nano.use('product');
            ProductDB.view('products', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (body.rows.length > 0) {
                        let model = new Product(body.rows[0].doc);
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
            let ProductDB = nano.use('product');
            ProductDB.insert(model, function(err, body) {
                if (!err) {
                    console.log(body);
                    resolve(model);
                } else {
                    reject(500);
                }
            });
        });
        return p;
    }

    static remove(model) {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('product');
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

    static count() {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('product');
            db.view('products', 'count', (err, body) => {
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

module.exports = ProductServer