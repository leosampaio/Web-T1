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