var express = require('express');
var router = express.Router();
let nano = require('nano')('http://localhost:5984');

let Admin = require('./models_api/admin.js');
let Client = require('./models_api/client.js');
let CalendarEvent = require('./models_api/event.js');
let Pet = require('./models_api/pet.js');
let Product = require('./models_api/product.js');
let Sale = require('./models_api/sale.js');

// admins API

router.get('/admins', (req, res) => {
    Admin.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/admins/:id', (req, res) => {
    Admin.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/admins/:id', (req, res) => {
    Admin.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new Admin(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        return Admin.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/admins/', (req, res) => {
    console.log(req.body)
    let model = new Admin(req.body);
    Admin.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/admins/', (req, res) => {
    Admin.getByID(req.body.id).then((response) => {
        let model = new Admin(response);
        return Admin.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// products API

router.get('/clients', (req, res) => {
    Client.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/clients/:id', (req, res) => {
    Client.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/clients/:id', (req, res) => {
    Client.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new Client(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        console.log(newModel);
        console.log(oldModel);
        return Client.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/clients/', (req, res) => {
    console.log(req.body)
    let model = new Client(req.body);
    Client.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/clients/', (req, res) => {
    Client.getByID(req.body.id).then((response) => {
        let model = new Client(response);
        return Client.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// products API

router.get('/products', (req, res) => {
    Product.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/products/:id', (req, res) => {
    Product.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/products/:id', (req, res) => {
    Product.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new Product(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        console.log(newModel);
        console.log(oldModel);
        return Product.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/products/', (req, res) => {
    console.log(req.body)
    let model = new Product(req.body);
    Product.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/products/', (req, res) => {
    Product.getByID(req.body.id).then((response) => {
        let model = new Product(response);
        return Product.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// pets API

router.get('/pets', (req, res) => {
    Pet.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/pets/:id', (req, res) => {
    Pet.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/pets/:id', (req, res) => {
    Pet.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new Pet(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        console.log(newModel);
        console.log(oldModel);
        return Pet.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/pets/', (req, res) => {
    console.log(req.body)
    let model = new Pet(req.body);
    Pet.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/pets/', (req, res) => {
    Pet.getByID(req.body.id).then((response) => {
        let model = new Pet(response);
        return Pet.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// events API

router.get('/events', (req, res) => {
    CalendarEvent.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/events/:id', (req, res) => {
    CalendarEvent.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/events/:id', (req, res) => {
    CalendarEvent.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new CalendarEvent(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        console.log(newModel);
        console.log(oldModel);
        return CalendarEvent.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/events/', (req, res) => {
    console.log(req.body)
    let model = new CalendarEvent(req.body);
    CalendarEvent.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/events/', (req, res) => {
    CalendarEvent.getByID(req.body.id).then((response) => {
        let model = new CalendarEvent(response);
        return CalendarEvent.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// sales API

router.get('/sales', (req, res) => {
    Sale.getAll().then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.json(error);
    })
});

router.get('/sales/:id', (req, res) => {
    Sale.getByID(req.params.id).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/sales/:id', (req, res) => {
    Sale.getByID(req.body.id).then((response) => {
        let oldModel = response;
        let newModel = new Sale(req.body);
        newModel._id = oldModel._id;
        newModel._rev = oldModel._rev;
        console.log(newModel);
        console.log(oldModel);
        return Sale.insert(newModel);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/sales/', (req, res) => {
    console.log(req.body)
    let model = new Sale(req.body);
    Sale.insert(model).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.delete('/sales/', (req, res) => {
    Sale.getByID(req.body.id).then((response) => {
        let model = new Sale(response);
        return Sale.remove(model);
    }).then((response) => {
        res.json({
            'status': 'success'
        });
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

module.exports = router;