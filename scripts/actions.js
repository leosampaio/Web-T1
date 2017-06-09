'use strict';

var router = new Router();

router.actionForRoute("admin/admins", (parameters) => {
    let newModel = new Admin(parameters.model);
    if (parameters.id != null) {
        Admin.update(parameters.id, newModel);
    } else {
        Admin.create(newModel);
    }
})


router.actionForRoute("admin/clients", (parameters) => {
    let newModel = new Client(parameters.model);
    if (parameters.id != null) {
        Client.update(parameters.id, newModel);
    } else {
        Client.create(newModel);
    }
})

router.actionForRoute("admin/products", (parameters) => {
    let newModel = new Product(parameters.model);
    if (parameters.id != null) {
        Client.update(parameters.id, newModel);
    } else {
        Client.create(newModel);
    }
})

router.actionForRoute("admin/events", (parameters) => {
    let newModel = new CalendarEvent(parameters.model);
    if (parameters.id != null) {
        Client.update(parameters.id, newModel);
    } else {
        Client.create(newModel);
    }
})

