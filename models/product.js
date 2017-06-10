'use strict';

class Product {
    constructor(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.qty = properties.qty;
        this.type = properties.type;
        this.code = properties.code;
        this.description = properties.description;
        this.image_url = properties.image_url;
        this.price = properties.price
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
        resolve([
                new Product({id: 1, image_url: "../img/product-0.jpg", name: "Escova para Cães", price: "R$100,00", qty: 100}),
                new Product({id: 2, image_url: "../img/product-1.jpg", name: "Luva para Bolas", price: "R$200,00", qty: 100}),
                new Product({id: 3, image_url: "../img/product-2.jpg", name: "Drogas Orgânicas", price: "R$1250,00", qty: 100}),
                new Product({id: 4, image_url: "../img/product-3.jpg", name: "Canhão de Bolas de Tênis", price: "R$50,00", qty: 100}),
                new Product({id: 5, image_url: "../img/product-4.jpg", name: "Bola de Tênis Gigante", price: "R$5,00", qty: 100}),
                new Product({id: 6, image_url: "../img/product-5.jpg", name: "Pilha de Fezes Dourada", price: "R$500.000,00", qty: 100})
              ]);
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new Product({id: 1, image_url: "../img/product-0.jpg", name: "Escova para Cães", price: "R$100,00", qty: 100}));
        });
        return p
    }

    static update(id, model) {
        console.log("Updated id " + id + " with: ")
        console.log(model);
    }

    static create(model) {
        console.log("Created new model:")
        console.log(model);
    }
}