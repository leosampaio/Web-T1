class Router {

    static navigate(route) {
        window.location.replace("/#" + route);
    }

    constructor() {
        window.onhashchange = () => {this.urlChanged()};
        this.routes = {};
    }

    urlChanged() {
        const url = location.hash;
        const path = url.split('#');
        if (path.length > 1) {
           this.triggerEventForRoute(path[1]);
        }
    }

    _buildEventNameForRoute(route) {
        var event_name = "";
        var split_route = route.split('/');

        if (split_route.length == 0) { return; }

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
        var split_route = route.split('/');

        if (split_route.length == 0) { return; }

        const isAdmin = split_route[0] == 'admin';
        if (isAdmin) {
            split_route = split_route.slice(1);
        }

        if (split_route.length == 0) { return; }

        const resource = split_route[0];

        if (split_route.length > 1) {
            const resource_id = split_route[0];
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
        document.addEventListener(event_name, function(e) {
            callback(html_to_render => {
                console.log(html_to_render);
            }, e.detail);
        });
    }

    ajaxGet(url, success) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               success(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}