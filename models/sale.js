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
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["sales"]).objectStore("sales").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Sale(cursor.value);
                    model.id = cursor.key;
                    models.push(model);
                    cursor.continue();
                  }
                  else {
                    resolve(models);
                  }
                };
            })
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

    static createSales(sales) {
        let db = new Database()
        let transaction = db.idb.transaction(["sales"], "readwrite");

        transaction.onerror = (event) => {
          console.error("Something went wrong!", event);
        };

        let objectStore = transaction.objectStore("sales");

        let promises = sales.map((sale) => {
            let p = new Promise((resolve, reject) => {
                sale.datetime = new Date();
                let request = objectStore.add(sale);
                request.onsuccess = (event) => {
                   resolve();
                };
            });
            return p;
        })
        console.log(promises);
        return Promise.all(promises);
    }

    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId += 2;
        return this.latestId;
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