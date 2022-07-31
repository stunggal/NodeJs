const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

// use validator to validate the form
const { body, validationResult } = require("express-validator");

const contacts = require("./contacts");

// use ejs
app.set("view engine", "ejs");

// use ejs layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// create file contacts.js if not exist
const fs = require("fs");
if (!fs.existsSync("./contacts.js")) {
  fs.writeFileSync("./contacts.js", "module.exports = []");
}

// make route index
app.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    layout: "layouts/main",
  });
});

// make route contacts
app.get("/contacts", (req, res) => {
  // get data from contacts.js
  const contacts = require("./contacts");
  res.render("contacts", {
    title: "My Contacts",
    layout: "layouts/main",
    contacts: contacts,
  });
});

// make route about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    layout: "layouts/main",
  });
});

// make route delete contact
app.get("/contact/delete/:id", (req, res) => {
  // get data from contacts.js
  const contacts = require("./contacts");
  // get id from url
  const id = req.params.id;
  // find index of contact with id
  const index = contacts.findIndex((contact) => contact.id == id);
  // remove contact with index
  contacts.splice(index, 1);
  // save data to contacts.js
  fs.writeFileSync(
    "./contacts.js",
    "module.exports = " + JSON.stringify(contacts)
  );
  // redirect to contacts
  res.redirect("/contacts");
});

// make route edit contact
app.get("/contact/edit/:id", (req, res) => {
  // get data from contacts.js
  const contacts = require("./contacts");
  // get id from url
  const id = req.params.id;
  // find index of contact with id
  const index = contacts.findIndex((contact) => contact.id == id);
  // get contact with index
  const contact = contacts[index];
  // render edit contact
  res.render("edit", {
    title: "Edit Contact",
    layout: "layouts/main",
    contact: contact,
  });
});

// make route edit contact
app.post("/contact/edit/:id", (req, res) => {
  // get data from contacts.js
  const contacts = require("./contacts");
  // get id from url
  const id = req.params.id;
  // find index of contact with id
  const index = contacts.findIndex((contact) => contact.id == id);
  // get contact with index
  const contactIndex = contacts[index];
  // get data from form
  const { name, contact } = req.body;
  // update contact with index
  contactIndex.name = name;
  contactIndex.contact = contact;
  // save data to contacts.js
  fs.writeFileSync(
    "./contacts.js",
    "module.exports = " + JSON.stringify(contacts)
  );
  // redirect to contacts
  res.redirect("/contacts");
});

// make route detail contact
app.get("/contact/:id", (req, res) => {
  // send a contact by id if exist
  const contacts = require("./contacts");
  const contact = contacts.find((contact) => contact.id == req.params.id);
  if (contact) {
    res.render("contact", {
      title: "Contact Detail",
      layout: "layouts/main",
      contact: contact,
    });
  }
  // send 404 if contact not exist
  else {
    res.status(404).send("Contact not found");
  }
});

// make route add contact post method with express-validator
app.post(
  "/contact",
  [
    body("name").isLength({ min: 1 }).withMessage("Name is required"),
    body("contact").isLength({ min: 1 }).withMessage("Contact is required"),
  ],
  (req, res) => {
    // get errors from express-validator
    const errors = validationResult(req);
    // if errors exist, send back to index page
    if (!errors.isEmpty()) {
      res.render("index", {
        title: "Add Contact",
        layout: "layouts/main",
        errors: errors.array(),
        name: req.body.name,
        contact: req.body.contact,
      });
    }
    // if no errors, add contact to contacts.js
    else {
      // get data from contacts.js
      const contacts = require("./contacts");
      // get id from contacts.js
      const id = contacts.length + 1;
      // add new contact to contacts.js
      contacts.push({ id: id, name: req.body.name, contact: req.body.contact });
      // save data to contacts.js
      fs.writeFileSync(
        "./contacts.js",
        "module.exports = " + JSON.stringify(contacts)
      );
      // redirect to contacts page
      res.redirect("/contacts");
    }
  }
);

// make route not found
app.get("*", (req, res) => {
  res.render("notfound", {
    title: "Not Found",
    layout: "layouts/main",
  });
});

// listen on port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
