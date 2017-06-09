'use strict';

const DB_NAME = 'petioro';
const DB_VERSION = 4;

let _databaseInstance = null;

class Database {

    constructor() {

        if (!_databaseInstance) {

            _databaseInstance = this;

            // indexedDB.deleteDatabase(DB_NAME)

            let request = indexedDB.open(DB_NAME);
            request.onerror = (event) => {
                console.error("Something went wrong with the IndexDB");
            };

            request.onsuccess = (event) => {
              this.idb = event.target.result;
            };

            request.onupgradeneeded = (event) => {
                this.idb = event.target.result;
                let objectStore;

                objectStore = this.idb.createObjectStore("admins", { keyPath: "id" });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });
                objectStore.transaction.oncomplete = (e) => {
                    console.log(e);
                    let newlyCreatedAdminStore = this.idb.transaction("admins", "readwrite").objectStore("admins");
                    let masterAdmin = new Admin({
                        id: 0,
                        name: "Mestre",
                        username: "admin",
                        email: "admin@mail.com",
                        phone: "555 555 555",
                        password: "admin",
                        image_url: ""
                    });
                    newlyCreatedAdminStore.add(masterAdmin);
                };

                objectStore = this.idb.createObjectStore("clients", { autoIncrement : true });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });
                objectStore.createIndex("username", "username", { unique: true });

                objectStore = this.idb.createObjectStore("events", { autoIncrement : true });

                objectStore = this.idb.createObjectStore("pets", { autoIncrement : true });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("username", "username", { unique: true });

                objectStore = this.idb.createObjectStore("products", { autoIncrement : true });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("code", "code", { unique: true });

                objectStore = this.idb.createObjectStore("sales", { autoIncrement : true });

                objectStore = this.idb.createObjectStore("cart", { autoIncrement : true });
            };
        }

        return _databaseInstance;
    }

    getIDB() {
        let p = new Promise((resolve, reject) => {
            let request = indexedDB.open(DB_NAME);
            request.onerror = (event) => {
                console.error("Something went wrong with the IndexDB");
            };

            request.onsuccess = (event) => {
              this.idb = event.target.result;
              resolve(this.idb);
            };
        });
        return p;
    }
}