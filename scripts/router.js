'use strict';

let _routerInstance = null;

class Router {

    static navigate(route) {
        window.location.replace("/#" + route);
    }

    constructor() {
        if (!_routerInstance) {
            _routerInstance = this;
            window.onhashchange = () => {this.urlChanged()};
        }

        return _routerInstance
    }

    urlChanged() {
        const url = location.hash;
        const path = url.split('#');
        if (path.length > 1) {
           this.triggerEventForRoute(path[1]);
        } else {
            event = new CustomEvent('root', {
                bubbles: true,
                composed: true
            });
            document.dispatchEvent(event);
        }
    }

    _buildEventNameForActionRoute(route) {
        return "action-" + this._buildEventNameForRoute(route);
    }

    triggerActionForRoute(route, model, id, extra) {
        if (id !== null && id !== undefined) {
            event = new CustomEvent(this._buildEventNameForActionRoute(route), {
                bubbles: true,
                composed: true, 
                detail: {id: id, model: model, extra: extra}
            });
            document.dispatchEvent(event);
        } else {
            event = new CustomEvent(this._buildEventNameForActionRoute(route), {
                bubbles: true,
                composed: true,
                detail: {model: model}
            });
            document.dispatchEvent(event);
        }
    }

    _buildEventNameForRoute(route) {
        let event_name = "";
        let split_route = route.split('/');

        if (split_route.length == 0) { return; }
        if (split_route[0] == '') { return 'root' }

        const isAdmin = split_route[0] == 'admin';
        if (isAdmin) {
            split_route = split_route.slice(1);
            event_name = "admin-"
        }

        const resource = split_route[0];
        event_name = event_name + '-' + resource

        if (split_route.length > 1) {
            event_name = event_name + "-with-id"
        }

        return event_name
    }

    triggerEventForRoute(route) {
        let split_route = route.split('/');

        if (split_route.length == 0) { return; }

        const isAdmin = split_route[0] == 'admin';
        if (isAdmin) {
            split_route = split_route.slice(1);
        }

        const resource = split_route[0];

        if (split_route.length > 1) {
            const resource_id = split_route[1];
            event = new CustomEvent(this._buildEventNameForRoute(route), {
                bubbles: true,
                composed: true, 
                detail: {id: resource_id}
            });
            document.dispatchEvent(event);
        } else {
            event = new CustomEvent(this._buildEventNameForRoute(route), {
                bubbles: true,
                composed: true
            });
            document.dispatchEvent(event);
        }
    }

    viewForRoute(route, callback) {
        const event_name = this._buildEventNameForRoute(route);
        document.addEventListener(event_name, (e) => {
            callback(e.detail)
        });
    }

    actionForRoute(route, callback) {
        const event_name = this._buildEventNameForActionRoute(route);
        document.addEventListener(event_name, (e) => {
            callback(e.detail)
        });
    }

    ajaxGet(url, success) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               success(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    getTemplate(path, success) {
        let p = new Promise((resolve, reject) => {
            let url = "templates/" + path
            this.ajaxGet(url, resolve)
        });
        return p
    }

    renderHTMLWithType(html, type) {
        let p = new Promise((resolve, reject) => {
            let shell = ""; 
            let sidebarShouldBeAdmin = false;
            if (type == "admin") {
                shell = "templates/admin/base.html";
                sidebarShouldBeAdmin = true;
            } else if (type == "client") {
                shell = "templates/client/base.html";
                sidebarShouldBeAdmin = false;
            }

            let body = document.querySelector("body");
            let sidebar = document.querySelector("side-navbar");
            let content = document.querySelector("petioro-content");

            if (sidebar == null || (sidebarShouldBeAdmin != sidebar.admin)) {
                router.ajaxGet(shell, response => {
                    body.innerHTML = response;

                    content = document.querySelector("petioro-content");
                    content.innerHTML = html;
                    resolve(content)
                    setTimeout(() => { 
                        body.querySelector("side-navbar").selectedItemMenu = location.hash;
                    }, 10);
                })
            } else {
                // get sidebar and set selected item menu
                body.querySelector("side-navbar").selectedItemMenu = location.hash;

                content.innerHTML = html;
                resolve(content)
            }
        });
        return p;
    }

    renderAdmin(html) {
        return this.renderHTMLWithType(html, "admin");
    }

    renderClient(html) {
        let p = new Promise((resolve, reject) => {
            this.renderHTMLWithType(html, "client").then((content) => {
                resolve(content);
                return Cart.getCount();
            }).then((count) => {
                let navbar = document.querySelector('top-navbar');
                navbar.cartCount = "("+count+")";
            });
        });
        return p;   
    }

    renderLogin() {
        let body = document.querySelector("body");
        router.ajaxGet("/templates/login.html", response => {
            body.innerHTML = response;
        })
    }
}