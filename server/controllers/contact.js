let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let contact = require("../models/contact");

module.exports.displaycontactList = (req, res, next) => {
  contact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(contactList);

      res.render("contact/list", { title: "contacts", 
      contactList: contactList,
      displayName: req.user ? req.user.displayName : '' });
      //render contact.ejs and pass title and contactlist variable we are passing contactList object to contactList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contact/add", { title: "Add contact",
  displayName: req.user ? req.user.displayName : '' });
};

module.exports.addprocesspage = (req, res, next) => {
  let newcontact = contact({
   /* name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
*/
    name: req.body.name,
    // author: req.body.author,
    number: req.body.number,
    Email: req.body.Email,
    // published: req.body.published,
    // description: req.body.description,
    // price: req.body.price,
     

  });
  contact.create(newcontact, (err, contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact-list
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contact/edit", { title: "Edit contact", contact: contacttoedit, displayName: req.user ? req.user.displayName : '' });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = contact({
    _id: id,
    name: req.body.name,
   // author: req.body.author,
   number: req.body.number,
   Email: req.body.Email,
   // published: req.body.published,
   // description: req.body.description,
   // price: req.body.price,
  });
  contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.redirect("/contact-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/contact-list");
    }
  });
};
