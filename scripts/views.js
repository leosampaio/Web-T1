'use strict';

let router = new Router();

router.viewForRoute("", () => {
    router.renderLogin();
})

router.viewForRoute("logout", () => {
    router.renderLogin();
})

router.viewForRoute("admin/admins", () => {
    router.getTemplate("admin/admins/index.html").then((response) => {
        return Promise.all([router.renderAdmin(response), Admin.getAll()]);
    }).then((results) => {
        let content = results[0];
        let admins = results[1];
        content.querySelector('admins-table').admins = admins
    })
})

router.viewForRoute("admin/admins/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/admins/new.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("admin/admins/edit.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("admin/clients", () => {
    router.getTemplate("admin/clients/index.html").then((response) => {
        return Promise.all([router.renderAdmin(response), Client.getAll()]);
    }).then((results) => {
        let content = results[0];
        let clients = results[1];
        content.querySelector('clients-table').clients = clients
    })
})

router.viewForRoute("admin/clients/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/clients/new.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("admin/clients/edit.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("admin/products", () => {
    router.getTemplate("admin/products/index.html").then((response) => {
        return Promise.all([router.renderAdmin(response), Product.getAll()]);
    }).then((results) => {
        let content = results[0];
        let products = results[1];
        content.querySelector('products-table').products = products
    })
})

router.viewForRoute("admin/products/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/products/new.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("admin/products/edit.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("admin/earnings", () => {
    router.getTemplate("admin/earnings/index.html").then((response) => {
        return router.renderAdmin(response);
    }).then((content) => {

    })
})

router.viewForRoute("admin/sales", () => {
    router.getTemplate("admin/sales/index.html").then((response) => {
        return router.renderAdmin(response);
    }).then((content) => {

    })
})

router.viewForRoute("admin/sales/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/sales/second-step.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("admin/calendar", () => {
    router.getTemplate("admin/events/calendar.html").then((response) => {
        return router.renderAdmin(response);
    }).then((content) => {

    })
})

router.viewForRoute("admin/calendar/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/events/new.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("admin/events/edit.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("pets", () => {
    router.getTemplate("client/pets/index.html").then((response) => {
        return Promise.all([router.renderClient(response), Pet.getAll()])
    }).then((results) => {
        let content = results[0];
        let pets = results[1];
        content.querySelector("pet-cards").pets = pets
    });
})

router.viewForRoute("pets/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("client/pets/new.html").then((response) => {
            return router.renderClient(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("client/pets/edit.html").then((response) => {
            return router.renderClient(response);
        }).then((content) => {

        })
    }
})

router.viewForRoute("calendar", () => {
    router.getTemplate("client/events/calendar.html").then((response) => {
        return router.renderClient(response);
    }).then((content) => {

    })
})

router.viewForRoute("products", () => {
    router.getTemplate("client/products/index.html").then((response) => {
        return Promise.all([router.renderClient(response), Product.getAll()]);
    }).then((results) => {
        let content = results[0];
        let products = results[1];
        let cards = content.querySelector('product-cards');
        cards.products = products;
    })
})

router.viewForRoute("cart", () => {
    router.getTemplate("client/cart/index.html").then((response) => {
        return router.renderClient(response);
    }).then((content) => {

    })
})