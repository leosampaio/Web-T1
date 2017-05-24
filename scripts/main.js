'use strict';

window.addEventListener('WebComponentsReady', function() {

    document.addEventListener('did-click-cart', function(e) {
        console.info('Got a did-click-cart on main.js');
        window.location.replace("client-cart.html");
    });

    document.addEventListener('did-click-profile', function(e) {
    	console.info('Got a did-click-profile on main.js');
        // window.location.replace("#"); //TODO
    });

    document.addEventListener('did-click-logout', function(e) {
    	console.info('Got a did-click-logout on main.js');
        window.location.replace("adm-login.html"); 
    });

	document.addEventListener('did-select-pet', function(e) {
        console.info('Got a did-select-pet with pet: ', e.detail.pet);
        window.location.replace("client-edit-pet.html");
    });

    document.addEventListener('did-select-admins', function(e) {
        var event = new CustomEvent('did-select-admins on main.js');
        window.location.replace("adm-adms.html");
    });

    document.addEventListener('did-select-clients', function(e) {
        console.info('Got a did-select-clients on main.js');
        window.location.replace("adm-clients.html");
    });

    document.addEventListener('did-select-products', function(e) {
        console.info('Got a did-select-products on main.js');
        window.location.replace("adm-products.html");
    });

    document.addEventListener('did-select-earnings', function(e) {
        console.info('Got a did-select-earnings on main.js');
        window.location.replace("adm-earnings.html");
    });

    document.addEventListener('did-select-sales', function(e) {
        console.info('Got a did-select-sales on main.js');
        window.location.replace("adm-sales.html");
    });

    document.addEventListener('did-select-calendar', function(e) {
        console.info('Got a did-select-calendar on main.js');
        window.location.replace("adm-calendar.html");
    });

    document.addEventListener('client-did-select-pets', function(e) {
        console.info('Got a client-did-select-pets on main.js');
        window.location.replace("client-pets.html");
    });

    document.addEventListener('client-did-select-calendar', function(e) {
        console.info('Got a client-did-select-calendar on main.js');
        window.location.replace("client-calendar.html");
    });

    document.addEventListener('client-did-select-products', function(e) {
        console.info('Got a client-did-select-products on main.js');
        window.location.replace("client-products.html");
    });
});