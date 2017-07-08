'use strict';

class Product {
    constructor(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.qty = properties.qty;
        this.type = properties.type;
        this.code = properties.code;
        this.description = properties.description;
        this.image_url = properties.image_url;
        this.price = properties.price
        this._id = properties._id;
        this._rev = properties._rev;

        if (this.type != 'product') { this.qty = null; }
    }

    static getAll() {
        let url = '/api/products';
        let p = new Promise((resolve, reject) => {
            ajax('GET', url).then((result) => {
                resolve(result.map((m) => { return new Product(m) }))
            }).catch((error) => {
                reject(error);
            })
        });
        return p;
    }

    static getAllServices() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            this.getAll().then((products) => {
                let services = products.filter((p) => {
                    return p.type == "service";
                });
                resolve(services);
            });
        });
        return p;
    }

    static getByID(id) {
        let url = '/api/products/' + id
        return ajax('GET', url);
    }

    static update(id, model) {
        let url = '/api/products/' + id
        if (model.type != 'product') { model.qty = null; }
        return ajax('POST', url, model);
    }

    static create(model) {
        let url = '/api/products/'
        return ajax('POST', url, model);
    }

    static delete(id) {
        let url = '/api/products/'
        return ajax('DELETE', url, {"id": id});
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++
        return this.latestId
    }
}

if (typeof module !== "undefined") {
    module.exports = Product
}