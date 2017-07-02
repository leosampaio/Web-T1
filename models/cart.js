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
            let db = new Database();
            db.getIDB().then((idb) => {
                let models = [];
                db.idb.transaction(["cart"]).objectStore("cart").openCursor().onsuccess = (event) => {
                  let cursor = event.target.result;
                  if (cursor) {
                    let model = new Sale(cursor.value);
                    model.id = cursor.key;
                    model.product = new Product(model.product);
                    models.push(model);
                    cursor.continue();
                  }
                  else {
                    let cart = new Cart({sales: models});
                    resolve(cart);
                  }
                };
            })
        });
        return p;
    }

    static getCount() {
        let p = new Promise((resolve, reject) => {
            this.getCurrent().then((cart) => {
                resolve(cart.sales.length);
            });
        });
        return p;
    }

    static addProduct(product) {
        let p = new Promise((resolve, reject) => {
            this.getCurrent().then((cart) => {
                let sale, request; 
                let db = new Database()
                let transaction = db.idb.transaction(["cart"], "readwrite");
                let objectStore = transaction.objectStore("cart");
                transaction.onerror = (event) => { console.error("Something went wrong!", event); };

                let currentSalesOfSameProduct = cart.sales.filter((s) => {
                    return s.product.id == product.id;
                });
                if (currentSalesOfSameProduct.length != 0) {
                    sale = currentSalesOfSameProduct[0];
                    sale.product = product;
                    sale.qty++;
                    request = objectStore.put(sale);
                } else {
                    sale = new Sale({qty: 1, product: product});
                    sale.id = Sale.incrementId();
                    request = objectStore.add(sale);
                }

                request.onsuccess = (event) => {
                   resolve();
                };
            });
        });
        return p;
    }

    static removeItem(id) {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            let transaction = db.idb.transaction(["cart"], "readwrite");

            transaction.onerror = (event) => {
              console.error("Something went wrong!", event);
            };

            let objectStore = transaction.objectStore("cart");
            let request = objectStore.delete(id);
            request.onsuccess = (event) => {
               resolve();
            };
        });
        return p;
    }

    static clear() {
        let p = new Promise((resolve, reject) => {
            let db = new Database();
            db.getIDB().then((idb) => {
                let transaction = idb.transaction(["cart"], "readwrite");
                let objectStore = transaction.objectStore("cart");
                objectStore.clear();
            })
        });
        return p;
    }

    static closeSale() {
        let p = new Promise((resolve, reject) => {
            this.getCurrent().then((cart) => {
                return Sale.createSales(cart.sales);
            }).then(() => {
                this.clear();
                resolve();
            });
        });
        return p;
    }
}

if (typeof module !== "undefined") {
    module.exports = Admin
}