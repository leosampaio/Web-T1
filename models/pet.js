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
        resolve([
                new Pet({id: 1, name: 'Auau', image_url: '../img/pet-0.jpg', description: 'Lorem ipsum dolor sit amet'}),
                new Pet({id: 2, name: 'Dom York', image_url: '../img/pet-1.jpg', description: 'Lorem ipsum dolor sit amet'}),
                new Pet({id: 3, name: 'Sir Bob', image_url: '../img/pet-2.jpg', description: 'Lorem ipsum dolor sit amet'}),
                new Pet({id: 4, name: 'MiauMiau', image_url: '../img/pet-3.jpg', description: 'Lorem ipsum dolor sit amet'}),
                new Pet({id: 5, name: 'Lizbet Gatínea', image_url: '../img/pet-4.jpg', description: 'Lorem ipsum dolor sit amet'}),
                new Pet({id: 6, name: 'Dona Barb', image_url: '../img/pet-5.jpg', description: 'Lorem ipsum dolor sit amet'}),
              ]);
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new Pet({id: 1, name: 'Auau', image_url: '../img/pet-0.jpg', description: 'Lorem ipsum dolor sit amet'}));
        });
        return p
    }
}