'use strict';

let Sale = require('../../models/sale.js');
let Product = require('./product.js');
let nano = require('nano')('http://localhost:5984');

class SaleServer extends Sale {
	static getAll() {
        let p = new Promise((resolve, reject) => {
            let SaleDB = nano.use('sale');
            SaleDB.view('sales', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new Sale(doc.doc);
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
            let SaleDB = nano.use('sale');
            SaleDB.view('sales', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (body.rows.length > 0) {
                        let model = new Sale(body.rows[0].doc);
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
            let db = nano.use('sale');
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

    static insertMany(sales) {
        console.log('sales: ', sales);
        let p = new Promise((resolve, reject) => {
            let db = nano.use('sale');
            this.count().then((count) => {
                let productPromises = sales.map((sale) => {
                    let p = new Promise((resolve, reject) => {
                        Product.getByID(sale.product.id).then((response) => {
                            let product = new Product(response);
                            if (product.qty !== null && product.qty !== undefined) {
                                product.qty = product.qty - sale.qty;
                            }
                            sale.product = product;
                            return Product.insert(product);
                        }).then((response) => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error);
                        })
                    });
                    return p;
                });

                let salePromises = sales.map((sale) => {
                    sale.datetime = new Date();
                    let p = new Promise((resolve, reject) => {
                        count = count + 1;
                        sale.id = count;
                        console.log(sale);
                        db.insert(sale, function(err, body) {
                            if (!err) {
                                console.log(body);
                                resolve(sale);
                            } else {
                                reject(err);
                            }
                        });
                    })
                    return p;
                });
                let promises = salePromises.concat(productPromises);
                return Promise.all(promises);
            }).then((result) => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
        return p;
    }

    static remove(model) {
        let p = new Promise((resolve, reject) => {
            let db = nano.use('sale');
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
            let db = nano.use('sale');
            db.view('sales', 'count', (err, body) => {
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

module.exports = SaleServer