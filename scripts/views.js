'use strict';

var router = new Router();

router.viewForRoute("", () => {
    router.renderLogin()
})

router.viewForRoute("logout", () => {
    router.renderLogin()
})

router.viewForRoute("admin/admins", () => {
    router.ajaxGet("/html/adm-adms.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/clients", () => {
    router.ajaxGet("/html/adm-clients.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/products", () => {
    router.ajaxGet("/html/adm-products.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/earnings", () => {
    router.ajaxGet("/html/adm-earnings.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/sales", () => {
    router.ajaxGet("/html/adm-sales.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("admin/calendar", () => {
    router.ajaxGet("/html/adm-calendar.html", response => {
        router.renderAdmin(response)
    })
})

router.viewForRoute("pets", () => {
    router.ajaxGet("/html/client-pets.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("calendar", () => {
    router.ajaxGet("/html/client-calendar.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("products", () => {
    router.ajaxGet("/html/client-products.html", response => {
        router.renderClient(response)
    })
})

router.viewForRoute("cart", () => {
    router.ajaxGet("/html/client-cart.html", response => {
        router.renderClient(response)
    })
})