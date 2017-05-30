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
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
        resolve([
                new Client({id: 1, name: 'John', email: 'client@mail.com', phone: '555 17 3343'}),
                new Client({id: 2, name: 'Alice York', email: 'client@mail.com', phone: '555 17 3343'}),
                new Client({id: 3, name: 'Mr. Bob', email: 'client@mail.com', phone: '555 17 3343'}),
                new Client({id: 4, name: 'Sir Aladin', email: 'client@mail.com', phone: '555 17 3343'}),
                new Client({id: 5, name: 'Ms. Cat', email: 'client@mail.com', phone: '555 17 3343'}),
                new Client({id: 6, name: 'Mr. Barb', email: 'client@mail.com', phone: '555 17 3343'}),
              ]);
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new Client({id: 1, name: 'Mestre', email: 'admin@mail.com', phone: '555 17 3343'}));
        });
        return p
    }
}