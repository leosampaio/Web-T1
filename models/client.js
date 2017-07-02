'use strict';

class Client {
    constructor(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.username = properties.username;
        this.email = properties.email;
        this.phone = properties.phone;
        this.password = properties.password;
        this.image_url = properties.image_url;
        this.address = properties.address;
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["clients"]).objectStore("clients").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Client(cursor.value);
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

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            let transaction = db.idb.transaction(["clients"]);
            let objectStore = transaction.objectStore("clients");
            let request = objectStore.get(Number(id));
            request.onerror = function(event) {
              console.error("Something went wrong!", event);
            };
            request.onsuccess = function(event) {
              resolve(new Client(request.result));
            };
        });
        return p;
    }

    static update(id, model) {
        let p = new Promise((resolve, reject) => {
            console.log("Updated id " + id + " with: ")
            console.log(model);
            model.id = Number(id);

            let db = new Database()
            let transaction = db.idb.transaction(["clients"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("clients");
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
            let transaction = db.idb.transaction(["clients"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("clients");
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
            let transaction = db.idb.transaction(["clients"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("clients");
            let request = objectStore.delete(id);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 1;
        else this.latestId++
        return this.latestId
    }
}

if (typeof module !== "undefined") {
    module.exports = Admin
}