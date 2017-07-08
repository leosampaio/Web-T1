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
        this._id = properties._id;
        this._rev = properties._rev;
    }

    static getAll() {
        return ajax('GET', '/api/admins');
    }

    static getByID(id) {
        let url = '/api/admins/' + id
        return ajax('GET', url);
    }

    static update(id, model) {
        let url = '/api/admins/' + id
        return ajax('POST', url, model);
    }

    static create(model) {
        let url = '/api/admins/'
        return ajax('POST', url, model);
    }

    static delete(id) {
        let url = '/api/admins/'
        return ajax('DELETE', url, {"id": id});
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