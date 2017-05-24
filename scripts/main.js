'use strict';

window.addEventListener('WebComponentsReady', function() {

    window.dispatchEvent(new Event('hashchange'));

	document.addEventListener('did-select-pet', function(e) {
        console.info('Got a did-select-pet with pet: ', e.detail.pet);
        window.location.replace("client-edit-pet.html");
    });
});