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
              this._updateAutoincrementingID();
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

                objectStore = this.idb.createObjectStore("clients", { keyPath: "id" });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });
                objectStore.createIndex("username", "username", { unique: true });

                objectStore = this.idb.createObjectStore("events", { keyPath: "id" });

                objectStore = this.idb.createObjectStore("pets", { keyPath: "id" });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("username", "username", { unique: true });

                objectStore = this.idb.createObjectStore("products", { keyPath: "id" });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("code", "code", { unique: true });

                objectStore = this.idb.createObjectStore("sales", { keyPath: "id" });

                objectStore = this.idb.createObjectStore("cart", { keyPath: "id" });
            };
        }

        return _databaseInstance;
    }

    _updateAutoincrementingID() {
        this.idb.transaction(["admins"]).objectStore("admins").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Admin.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["clients"]).objectStore("clients").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Client.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["products"]).objectStore("products").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Product.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["events"]).objectStore("events").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    CalendarEvent.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["pets"]).objectStore("pets").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Pet.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["cart"]).objectStore("cart").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Cart.latestId = cursor.key;
                }
            }
        };

        this.idb.transaction(["sales"]).objectStore("sales").openCursor(null, 'prev').onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cursor.key == 0) {
                    cursor.continue();
                } else {
                    Sale.latestId = cursor.key;
                }
            }
        };
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