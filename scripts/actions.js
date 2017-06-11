'use strict';

var router = new Router();

router.actionForRoute("admin/admins", (parameters) => {
    let newModel = new Admin(parameters.model);
    if (parameters.id !== null && parameters.id !== undefined) {
        Admin.update(parameters.id, newModel).then(() => {
            location.href='#admin/admins';
        });
    } else {
        Admin.create(newModel).then(() => {
            location.href='#admin/admins';
        });
    }
})


router.actionForRoute("admin/clients", (parameters) => {
    let newModel = new Client(parameters.model);
    if (parameters.id !== null && parameters.id !== undefined) {
        Client.update(parameters.id, newModel).then(() => {
            location.href='#admin/clients';
        });
    } else {
        Client.create(newModel).then(() => {
            location.href='#admin/clients';
        });
    }
})

router.actionForRoute("admin/products", (parameters) => {
    let newModel = new Product(parameters.model);
    if (parameters.id !== null && parameters.id !== undefined) {
        Product.update(parameters.id, newModel).then(() => {
            location.href='#admin/products';
        });
    } else {
        Product.create(newModel).then(() => {
            location.href='#admin/products';
        });
    }
})

router.actionForRoute("admin/events", (parameters) => {
    let newModel = new CalendarEvent(parameters.model);
    if (parameters.id !== null && parameters.id !== undefined) {
        Event.update(parameters.id, newModel).then(() => {
            location.href='#admin/calendar';
        });
    } else {
        Event.create(newModel).then(() => {
            location.href='#admin/calendar';
        });
    }
})

router.actionForRoute("pets", (parameters) => {
    let newModel = new Pet(parameters.model);
    if (parameters.id !== null && parameters.id !== undefined) {
        Pet.update(parameters.id, newModel).then(() => {
            location.href='#pets';
        });
    } else {
        Pet.create(newModel).then(() => {
            location.href='#pets';
        });
    }
})

router.actionForRoute("add-product-to-cart", (parameters) => {
    let product = new Product(parameters.model);
    Cart.addProduct(product).then(() => {
        window.dispatchEvent(new Event('hashchange')); // "reload" page
    });
})

router.actionForRoute("close-client-sale", (parameters) => {
    Cart.closeSale().then(() => {
        window.dispatchEvent(new Event('hashchange')); // "reload" page
    });
})

router.actionForRoute("close-admin-sale", (parameters) => {
    Cart.closeSale().then(() => {
        location.href='#admin/sales';
    });
})
