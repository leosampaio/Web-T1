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
}