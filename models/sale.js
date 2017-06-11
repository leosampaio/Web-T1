'use strict';

class Sale {
    constructor(properties) {
        this.id = properties.id;
        this.datetime = properties.datetime;
        this.product = properties.product; // the actual product object
        this.qty = properties.qty;
    }

    get _numericPrice() {
        let price = this.product.price;
        price = price.replace(',','.');
        price = price.replace(/[a-zA-Z$]/g,'');
        return Number(price);
    }

    get totalPrice() {
        return Number(this.qty)*this._numericPrice;
    }

    get formattedDate() {
        let formatted = this.datetime.toLocaleString('pt-BR');
        return formatted;
    }

    get formattedTotalPrice() {
        return "R$" + this.totalPrice.toFixed(2).replace('.', ',');
    }

    static getAll() {
        let p = new Promise((resolve, reject) => {
        resolve([
                new Sale({id: 1, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
                new Sale({id: 2, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
                new Sale({id: 3, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
                new Sale({id: 4, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
                new Sale({id: 5, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
                new Sale({id: 6, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}),
              ]);
        });
        return p;
    }

    static getByID(id) {
        let p = new Promise((resolve, reject) => {
            resolve(new Sale({id: 1, datetime: new Date(), qty: 2,
                    product: new Product({id: 1, name: "Escova para Cães", price: "R$100,00"})}));
        });
        return p
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++
        return this.latestId
    }
}