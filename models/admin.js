'use strict';

class Admin {
    constructor(properties) {
        this.id = Number(properties.id);
        this.name = properties.name;
        this.username = properties.username;
        this.email = properties.email;
        this.phone = properties.phone;
        this.password = properties.password;
        this.image_url = properties.image_url;
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["admins"]).objectStore("admins").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Admin(cursor.value);
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
            let transaction = db.idb.transaction(["admins"]);
            let objectStore = transaction.objectStore("admins");
            let request = objectStore.get(Number(id));
            request.onerror = function(event) {
              console.error("Something went wrong!", event);
            };
            request.onsuccess = function(event) {
              resolve(new Admin(request.result));
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
            let transaction = db.idb.transaction(["admins"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("admins");
            let request = objectStore.put(model);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static create(model) {
        let p = new Promise((resolve, reject) => {
            model.id = Admin.incrementId();
            console.log("Created new model:")
            console.log(model);

            let db = new Database()
            let transaction = db.idb.transaction(["admins"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("admins");
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
            let transaction = db.idb.transaction(["admins"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("admins");
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