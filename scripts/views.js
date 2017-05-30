'use strict';

let router = new Router();

router.viewForRoute("", () => {
    router.renderLogin()
})

router.viewForRoute("logout", () => {
    router.renderLogin()
})

router.viewForRoute("admin/admins", () => {
    router.getTemplate("admin/admins/index.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/admins/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/admins/new.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.getTemplate("admin/admins/edit.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/clients", () => {
    router.getTemplate("admin/clients/index.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/clients/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/clients/new.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.getTemplate("admin/clients/edit.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/products", () => {
    router.getTemplate("admin/products/index.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/products/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/products/new.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.getTemplate("admin/products/edit.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/earnings", () => {
    router.getTemplate("admin/earnings/index.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/sales", () => {
    router.getTemplate("admin/sales/index.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/sales/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/sales/second-step.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/calendar", () => {
    router.getTemplate("admin/events/calendar.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/calendar/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("admin/events/new.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.getTemplate("admin/events/edit.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("pets", () => {
    router.getTemplate("client/pets/index.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("pets/id", (params) => {
    if (params.id == 'new') {
        router.getTemplate("client/pets/new.html", response => {
            router.renderClient(response)
        })
    } else {
        router.getTemplate("client/pets/edit.html", response => {
            router.renderClient(response)
        })
    }
})

router.viewForRoute("calendar", () => {
    router.getTemplate("client/events/calendar.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("products", () => {
    router.getTemplate("client/products/index.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("cart", () => {
    router.getTemplate("client/cart/index.html", response => {
        router.renderClient(response)
    })
})