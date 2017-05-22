'use strict';

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('did-click-cart', function(e) {
        console.info('Got a did-click-cart on main.js');
        window.location.replace("client-cart.html");
    });

    document.addEventListener('did-select-pet', function(e) {
        console.info('Got a did-select-pet with pet: ', e.detail.pet);
        window.location.replace("client-edit-pet.html");
    });
})