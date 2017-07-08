'use strict'

let nano = require('nano')('http://localhost:5984');
let Admin = require('./models/admin.js');
let Client = require('./models/client.js');

// admins database

// clean up the database we created previously
nano.db.destroy('admin', () => {

  // create a new database
  nano.db.create('admin', () => {

    let adminDB = nano.use('admin');
    console.log('Created admins db')

    let masterAdmin = new Admin({
      id: 0,
      name: "Mestre",
      username: "admin",
      email: "admin@mail.com",
      phone: "555 555 555",
      password: "admin",
      image_url: "https://s-media-cache-ak0.pinimg.com/originals/b7/8c/e3/b78ce3c7026a82f05497f1c60a71d67c.jpg"
    });

    // insert default admin
    adminDB.insert(masterAdmin, masterAdmin.id, (err, body, header) => {
      if (err) {
        console.log('Could not insert default admin', err.message);
        return;
      }
      console.log('Inserted default admin: ')
      console.log(masterAdmin);
    });

    // create design documents
    adminDB.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/admins', (err, response) => {
      if (err) {
        console.log('Failed to create admin design document', err.message);
        return;
      } else {
        adminDB.view('admins', 'by_id', {
          'include_docs': true
        }, function(err, body) {
          if (err) {
            console.log(err)
          }
          if (!err) {
            console.log('Default admin was saved as: ');
            body.rows.forEach(function(doc) {
              console.log(doc);
            });
          }
        });
      }
    });
  });
});

// clients database 

nano.db.destroy('client', () => {

  // create a new database
  nano.db.create('client', () => {

    let db = nano.use('client');
    console.log('Created clients db')

    // create design documents
    db.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/clients', (err, response) => {
      if (err) {
        console.log('Failed to create client design document', err.message);
        return;
      } else {
        console.log('Sucessfully created client design document');
      }
    });
  });
});

// products database

nano.db.destroy('product', () => {

  // create a new database
  nano.db.create('product', () => {

    let db = nano.use('product');
    console.log('Created products db')

    // create design documents
    db.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/products', (err, response) => {
      if (err) {
        console.log('Failed to create product design document', err.message);
        return;
      } else {
        console.log('Sucessfully created product design document');
      }
    });
  });
});


// pets database

nano.db.destroy('pet', () => {

  // create a new database
  nano.db.create('pet', () => {

    let db = nano.use('pet');
    console.log('Created pet db')

    // create design documents
    db.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/pets', (err, response) => {
      if (err) {
        console.log('Failed to create pet design document', err.message);
        return;
      } else {
        console.log('Sucessfully created pet design document');
      }
    });
  });
});

// event database

nano.db.destroy('event', () => {

  // create a new database
  nano.db.create('event', () => {

    let db = nano.use('event');
    console.log('Created events db')

    // create design documents
    db.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/events', (err, response) => {
      if (err) {
        console.log('Failed to create event design document', err.message);
        return;
      } else {
        console.log('Sucessfully created event design document');
      }
    });
  });
});

// sale database

nano.db.destroy('sale', () => {

  // create a new database
  nano.db.create('sale', () => {

    let db = nano.use('sale');
    console.log('Created sales db')

    // create design documents
    db.insert({
      "views": {
        "by_id": {
          "map": function(doc) {
            emit(doc.id, null);
          }
        },
        "count": {
          "map": function(doc) {
            emit(doc.id, doc.id);
          },
          "reduce": "_stats"
        }
      }
    }, '_design/sales', (err, response) => {
      if (err) {
        console.log('Failed to create sale design document', err.message);
        return;
      } else {
        console.log('Sucessfully created sale design document');
      }
    });
  });
});