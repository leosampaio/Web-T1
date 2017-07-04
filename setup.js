'use strict'

let nano = require('nano')('http://localhost:5984');
let Admin = require('./models/admin.js');

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