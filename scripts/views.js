'use strict';

var router = new Router();

router.viewForRoute("admin/admins", render => {
    router.ajaxGet("adm-adms.html", response => {
        render(response)
    })
})