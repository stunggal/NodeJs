// use express
const express = require("express");
const app = express();

// reqire db
const db = require("./utils/db");

const { body, validationResult } = require("express-validator");

// use express validator
const fs = require("fs");

// model
const contact = require("./model/contact");

// use port 3000
const port = 3000;

// use express layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// use ejs
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// index route
app.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    layout: "layouts/main",
  });
});

// about route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    layout: "layouts/main",
  });
});

// contact route with data contact
app.get("/contacts", (req, res) => {
  contact.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("contacts", {
        title: "Contact Me",
        layout: "layouts/main",
        contacts: data,
      });
    }
  });
});

// make insert data to contact
app.post("/contact", (req, res) => {
  // id = 1 + id last data
  contact.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // create new contact
      let id = data.length + 1;
      const newContact = new contact({
        id: id,
        name: req.body.name,
        contact: req.body.contact,
      });
      // save new contact
      newContact.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/contacts");
          //   res.send(id);
        }
      });
    }
  });
});

// make route delete contact
app.get("/contact/delete/:id", (req, res) => {
  //delete one data from contact with id
  contact.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/contacts");
    }
  });
});

// make route detail contact
app.get("/contact/:id", (req, res) => {
  // send a contact by id if exist
  //   get all data from contact
  contact.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // get id from url
      const id = req.params.id;
      // find index of contact with id
      const index = data.findIndex((contact) => contact.id == id);
      // send contact with index
      res.render("contact", {
        title: "Detail Contact",
        layout: "layouts/main",
        contact: data[index],
      });
    }
  });
});

// make edit contact route
app.get("/contact/edit/:id", (req, res) => {
  // get data from contact
  contact.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // get id from url
      const id = req.params.id;
      // find index of contact with id
      const index = data.findIndex((contact) => contact.id == id);
      // send contact with index
      res.render("edit", {
        title: "Edit Contact",
        layout: "layouts/main",
        contact: data[index],
      });
    }
  });
});

// make update contact route
app.post("/contact/edit/:id", (req, res) => {
  // get data from contact
  contact.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // get id from url
      const id = req.params.id;
      // find index of contact with id
      const index = data.findIndex((contact) => contact.id == id);
      // update contact with index
      data[index].name = req.body.name;
      data[index].contact = req.body.contact;
      // save data
      data[index].save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/contacts");
        }
      });
    }
  });
});

// listen to port 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
