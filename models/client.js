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
        this._id = properties._id;
        this._rev = properties._rev;
    }

    static getAll() {
        return ajax('GET', '/api/clients');
    }

    static getByID(id) {
        let url = '/api/clients/' + id
        return ajax('GET', url);
    }

    static update(id, model) {
        let url = '/api/clients/' + id
        return ajax('POST', url, model);
    }

    static create(model) {
        let url = '/api/clients/'
        return ajax('POST', url, model);
    }

    static delete(id) {
        let url = '/api/clients/'
        return ajax('DELETE', url, {"id": id});
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 1;
        else this.latestId++
        return this.latestId
    }
}

if (typeof module !== "undefined") {
    module.exports = Client
}