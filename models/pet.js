'use strict';

class Pet {
    constructor(properties) {
        this.id = properties.id
        this.name = properties.name
        this.image_url = properties.image_url
        this.description = properties.description
        this.username = properties.username
        this.race = properties.race
        this.birthdate = properties.birthdate
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["pets"]).objectStore("pets").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Pet(cursor.value);
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
            let transaction = db.idb.transaction(["pets"]);
            let objectStore = transaction.objectStore("pets");
            let request = objectStore.get(Number(id));
            request.onerror = function(event) {
              console.error("Something went wrong!", event);
            };
            request.onsuccess = function(event) {
              resolve(new Pet(request.result));
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
            let transaction = db.idb.transaction(["pets"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("pets");
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
            let transaction = db.idb.transaction(["pets"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("pets");
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
            let transaction = db.idb.transaction(["pets"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("pets");
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