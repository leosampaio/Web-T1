'use strict';

class Admin {
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
                new Admin({id: 1, name: 'Mestre', email: 'admin@mail.com'}),
                new Admin({id: 2, name: 'Mestre York', email: 'admin@mail.com'}),
                new Admin({id: 3, name: 'Mestre Bob', email: 'admin@mail.com'}),
                new Admin({id: 4, name: 'Mestre', email: 'admin@mail.com'}),
                new Admin({id: 5, name: 'Mestre Gatínea', email: 'admin@mail.com'}),
                new Admin({id: 6, name: 'Mestre Barb', email: 'admin@mail.com'}),
                ]);
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new Admin({id: 1, name: 'Mestre', email: 'admin@mail.com'}));
        });
        return p
    }
}