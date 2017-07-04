var express = require('express');
var router = express.Router();
let nano = require('nano')('http://localhost:5984');

let Admin = require('./models_api/admin.js');

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

module.exports = router;