'use strict';

class Sale {
    constructor(properties) {
        this.id = properties.id;
        this.datetime = Date(properties.datetime);
        this.product = properties.product; // the actual product object
        this.qty = properties.qty;
        this._id = properties._id;
        this._rev = properties._rev;
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
        let formatted = Date(this.datetime).toLocaleString('pt-BR');
        return formatted;
    }

    get formattedTotalPrice() {
        return "R$" + this.totalPrice.toFixed(2).replace('.', ',');
    }

    static getAll() {
        let url = '/api/sales';
        let p = new Promise((resolve, reject) => {
            ajax('GET', url).then((result) => {
                resolve(result.map((m) => { return new Sale(m) }))
            }).catch((error) => {
                reject(error);
            })
        });
        return p;
    }

    static getByID(id) {
        let url = '/api/sales/' + id
        return ajax('GET', url);
    }

    static createSales(sales) {
        let url = '/api/sales/'
        return ajax('POST', url, sales);
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId += 2;
        return this.latestId;
    }

    static delete(id) {
        let url = '/api/sales/'
        return ajax('DELETE', url, {"id": id});
    }

    static totalAmountFromSumOfSales(sales) {
        if (!sales) { return 0; }
        let amount = sales.reduce((total, sale) => { return total + sale.totalPrice }, 0);
        return amount;
    }

    static totalQtyFromSumOfSales(sales) {
        if (!sales) { return 0; }
        let qty = sales.reduce((total, sale) => { return total + Number(sale.qty) }, 0);
        return qty;
    }
}

if (typeof module !== "undefined") {
    module.exports = Sale
}