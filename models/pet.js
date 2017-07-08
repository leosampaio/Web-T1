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
        this._id = properties._id;
        this._rev = properties._rev;
    }

    static getAll() {
        let url = '/api/pets';
        let p = new Promise((resolve, reject) => {
            ajax('GET', url).then((result) => {
                resolve(result.map((m) => { return new Pet(m) }))
            }).catch((error) => {
                reject(error);
            })
        });
        return p;
    }

    static getByID(id) {
        let url = '/api/pets/' + id
        return ajax('GET', url);
    }

    static update(id, model) {
        let url = '/api/pets/' + id
        return ajax('POST', url, model);
    }

    static create(model) {
        let url = '/api/pets/'
        return ajax('POST', url, model);
    }

    static delete(id) {
        let url = '/api/pets/'
        return ajax('DELETE', url, {"id": id});
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++
        return this.latestId
    }
}

if (typeof module !== "undefined") {
    module.exports = Pet
}