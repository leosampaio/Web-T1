'use strict';

var router = new Router();

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
        content.querySelector('admins-table').admins = admins;
    })
})

router.viewForRoute("admin/admins/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/admins/form.html").then((response) => {
            return router.renderAdmin(response);
        })
    } else {
        router.getTemplate("admin/admins/form.html").then((response) => {
            return Promise.all([router.renderAdmin(response), Admin.getByID(params.id)]);
        }).then((results) => {
            let content = results[0];
            let model = results[1];
            content.querySelector('petioro-form').model = model;
        })
    }
})

router.viewForRoute("admin/clients", () => {
    router.getTemplate("admin/clients/index.html").then((response) => {
        return Promise.all([router.renderAdmin(response), Client.getAll()]);
    }).then((results) => {
        let content = results[0];
        let clients = results[1];
        content.querySelector('clients-table').clients = clients;
    })
})

router.viewForRoute("admin/clients/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/clients/form.html").then((response) => {
            return router.renderAdmin(response);
        })
    } else {
        router.getTemplate("admin/clients/form.html").then((response) => {
            return Promise.all([router.renderClient(response), Client.getByID(params.id)]);
        }).then((results) => {
            let content = results[0];
            let model = results[1];
            content.querySelector('petioro-form').model = model
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
        return Promise.all([router.renderAdmin(response), Sale.getAll()]);
    }).then((results) => {
        let content = results[0];
        let sales = results[1];
        content.querySelector('earnings-table').sales = sales
    })
})

router.viewForRoute("admin/sales", () => {
    router.getTemplate("admin/sales/index.html").then((response) => {
        return Promise.all([router.renderAdmin(response), Product.getAll(), Cart.getCurrent()]);
    }).then((results) => {
        let content = results[0];
        let products = results[1];
        let cart = results[2];
        content.querySelector('products-sale-table').products = products;
        content.querySelector('cart-table').cart = cart;
    })
})

router.viewForRoute("admin/sales/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/sales/second-step.html").then((response) => {
            return Promise.all([router.renderAdmin(response), Cart.getCurrent()]);
        }).then((results) => {
            let content = results[0];
            let cart = results[1];
            content.querySelector('cart-table').cart = cart;
        })
    }
})

router.viewForRoute("admin/calendar", () => {
    router.getTemplate("admin/events/calendar.html").then((response) => {
        return Promise.all([router.renderAdmin(response), DailySummary.getDailySummaryForToday()]);
    }).then((results) => {
        let content = results[0];
        let summary = results[1];
        content.querySelector('petioro-calendar').dailySummary = summary;
    })
})

router.viewForRoute("admin/calendar/id", (params) => {
    router.getTemplate("admin/events/calendar.html").then((response) => {
        return Promise.all([router.renderAdmin(response), DailySummary.getDailySummaryForDate(params.id)]);
    }).then((results) => {
        let content = results[0];
        let summary = results[1];
        content.querySelector('petioro-calendar').dailySummary = summary;
    })
})

router.viewForRoute("admin/events/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("client/events/new.html").then((response) => {
            return router.renderAdmin(response);
        }).then((content) => {

        })
    } else {
        router.getTemplate("client/events/edit.html").then((response) => {
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