'use strict';

var router = new Router();

router.viewForRoute("", () => {
    router.renderLogin()
})

router.viewForRoute("logout", () => {
    router.renderLogin()
})

router.viewForRoute("admin/admins", () => {
    router.ajaxGet("html/adm-adms.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/admins/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/adm-new-adm.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.ajaxGet("html/adm-edit-adm.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/clients", () => {
    router.ajaxGet("html/adm-clients.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/clients/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/adm-new-client.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.ajaxGet("html/adm-edit-client.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/products", () => {
    router.ajaxGet("html/adm-products.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/products/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/adm-new-product.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.ajaxGet("html/adm-edit-product.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/earnings", () => {
    router.ajaxGet("html/adm-earnings.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/sales", () => {
    router.ajaxGet("html/adm-sales.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/sales/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/adm-sales-close.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("admin/calendar", () => {
    router.ajaxGet("html/adm-calendar.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/calendar/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/client-calendar-new-event.html", response => {
            router.renderAdmin(response)
        })
    } else {
        router.ajaxGet("html/client-calendar-new-event.html", response => {
            router.renderAdmin(response)
        })
    }
})

router.viewForRoute("pets", () => {
    router.ajaxGet("html/client-pets.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("pets/id", (params) => {
    if (params.id == 'new') {
        router.ajaxGet("html/client-new-pet.html", response => {
            router.renderClient(response)
        })
    } else {
        router.ajaxGet("html/client-edit-pet.html", response => {
            router.renderClient(response)
        })
    }
})

router.viewForRoute("calendar", () => {
    router.ajaxGet("html/client-calendar.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("products", () => {
    router.ajaxGet("html/client-products.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("cart", () => {
    router.ajaxGet("html/client-cart.html", response => {
        router.renderClient(response)
    })
})