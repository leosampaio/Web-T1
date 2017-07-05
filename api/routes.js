var express = require('express');
var router = express.Router();
let nano = require('nano')('http://localhost:5984');

let Admin = require('./models_api/admin.js');
let Client = require('./models_api/client.js');

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
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/admins/', (req, res) => {
    console.log(req.body)
    let model = new Admin(req.body);
    Admin.insert(model).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

// clients API

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
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

router.post('/clients/', (req, res) => {
    console.log(req.body)
    let model = new Client(req.body);
    Client.insert(model).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
});

module.exports = router;