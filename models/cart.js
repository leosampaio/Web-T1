'use strict';

class Cart {
    constructor(properties) {
        this.sales = properties.sales;
    }

    get totalPrice() {
        let total = 0.0;
        for (let sale of this.sales) {
            total = total + sale.totalPrice;
        }
        return total
    }

    get formattedTotalPrice() {
        return "R$" + this.totalPrice.toFixed(2).replace('.', ',');
    }

    static getCurrent() {
        let p = new Promise((resolve, reject) => {
        resolve(new Cart({
            sales:[
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
              ]
            }));
        });
        return p;
    }
}