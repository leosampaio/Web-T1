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

        if (this.type != 'product') { this.qty = null; }
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["products"]).objectStore("products").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Product(cursor.value);
                    model.id = cursor.key;
                    models.push(cursor.value);
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
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            let transaction = db.idb.transaction(["products"]);
            let objectStore = transaction.objectStore("products");
            let request = objectStore.get(Number(id));
            request.onerror = function(event) {
              console.error("Something went wrong!", event);
            };
            request.onsuccess = function(event) {
              resolve(new Product(request.result));
            };
        });
        return p;
    }

    static update(id, model) {
        let p = new Promise((resolve, reject) => {
            console.log("Updated id " + id + " with: ")
            console.log(model);
            model.id = Number(id);

            if (model.type != 'product') { model.qty = null; }

            let db = new Database()
            let transaction = db.idb.transaction(["products"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("products");
            let request = objectStore.put(model);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static create(model) {
        let p = new Promise((resolve, reject) => {
            model.id = this.incrementId();
            console.log("Created new model:")
            console.log(model);

            let db = new Database()
            let transaction = db.idb.transaction(["products"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("products");
            let request = objectStore.add(model);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static delete(id) {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            let transaction = db.idb.transaction(["products"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("products");
            let request = objectStore.delete(id);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++
        return this.latestId
    }
}

if (typeof module !== "undefined") {
    module.exports = Admin
}