document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('top-navbar');
    el.addEventListener('did-click-cart', function(e) {
        console.info('Got a did-click-cart on main.js');
        window.location.replace("client-cart.html");
    });
})