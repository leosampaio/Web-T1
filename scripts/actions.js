'use strict';

var router = new Router();

router.actionForRoute("admin/admins", (parameters) => {
    let newModel = new Admin(parameters.model);
    if (parameters.id != null) {
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
    if (parameters.id != null) {
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
    if (parameters.id != null) {
        Client.update(parameters.id, newModel).then(() => {
            location.href='#admin/products';
        });
    } else {
        Client.create(newModel).then(() => {
            location.href='#admin/products';
        });
    }
})

router.actionForRoute("admin/events", (parameters) => {
    let newModel = new CalendarEvent(parameters.model);
    if (parameters.id != null) {
        Client.update(parameters.id, newModel).then(() => {
            location.href='#admin/calendar';
        });
    } else {
        Client.create(newModel).then(() => {
            location.href='#admin/calendar';
        });
    }
})

router.actionForRoute("client/pets", (parameters) => {
    let newModel = new Pet(parameters.model);
    if (parameters.id != null) {
        Client.update(parameters.id, newModel).then(() => {
            location.href='#pets';
        });
    } else {
        Client.create(newModel).then(() => {
            location.href='#pets';
        });
    }
})

