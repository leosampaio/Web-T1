class Router {

    static navigate(route) {
        window.location.replace("/#" + route);
    }

    constructor() {
        window.onhashchange = this.urlChanged;
        this.routes = {};
    }

    urlChanged() {
        const url = location.hash;
        const path = url.split('#');
        if (path.length) > 1 {
           render(path[1]);
        }
    }

    _buildEventNameForRoute(route) {
        var event_name = "";
        var split_route = url.split('/');

        if (split_route.length == 0) { return; }

        const isAdmin = split_route[0] == 'admin';
        if (isAdmin) {
            split_route = split_route.slice(1);
            event_name = "admin-"
        }

        event_name = event_name + '-' + resource

        if (split_route.length > 1) {
            event_name = event_name + "-with-id"
        }

        return event_name
    }

    triggerEventForRoute(route) {
        var split_route = url.split('/');

        if (split_route.length == 0) { return; }

        const isAdmin = split_route[0] == 'admin';
        if (isAdmin) {
            split_route = split_route.slice(1);
        }

        if (split_route.length == 0) { return; }

        const resource = split_route[0];

        if (split_route.length > 1) {
            const resource_id = split_route[0];
            event = new CustomEvent(_buildEventNameForRoute(route), {
                bubbles: true,
                composed: true, 
                detail: {id: resource_id}
            });
            document.dispatchEvent(event);
        } else {
            event = new CustomEvent(_buildEventNameForRoute(route), {
                bubbles: true,
                composed: true
            });
            document.dispatchEvent(event);
        }
    }

    registerForRoute(route, callback) {
        const event_name = _buildEventNameForRoute(route);
        document.addEventListener(event_name, function(e) {
            html_to_render = callback(e.detail);
            console.log(html_to_render);
        });
    }
}