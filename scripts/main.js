'use strict';

window.addEventListener('WebComponentsReady', function() {

    window.dispatchEvent(new Event('hashchange'));
    let db = new Database();
});

