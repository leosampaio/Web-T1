'use strict';

let Pet = require('../models/pet.js');
let nano = require('nano')('http://localhost:5984');

class PetServer extends Pet {
	static getAll() {
        let p = new Promise((resolve, reject) => {
            let petDB = nano.use('pet');
            petDB.view('pets', 'by_id', {
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                } else {
                    let models = [];
                    body.rows.forEach((doc) => {
                        let model = new Pet(doc.doc);
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
            let PetDB = nano.use('pet');
            PetDB.view('pets', 'by_id', {
                'key': parseInt(id),
                'include_docs': true
            }, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (body.rows.length > 0) {
                        let model = new Pet(body.rows[0].doc);
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
            let PetDB = nano.use('pet');
            PetDB.insert(model, function(err, body) {
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

    static delete(id) {
        let p = new Promise((resolve, reject) => {
            
        });
        return p;
    }
}