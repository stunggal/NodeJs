const express = require("express");
const app = express();
const port = 3000;

// use ejs
app.set("view engine", "ejs");

// make sa simple middleware for time
app.use((req, res, next) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;
  res.locals.time = time;
  console.log(`${time} - ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.render("index");
});

// about page
app.get("/about", (req, res) => {
  // res.sendFile(__dirname + "/about.html");
  res.render("about");
});

// contact page
app.get("/contact", (req, res) => {
  // res.sendFile(__dirname + "/contact.html");
  const data = [
    {
      name: "John",
      age: 30,
    },
    {
      name: "Jane",
      age: 25,
    },
    {
      name: "Bob",
      age: 20,
    },
  ];
  res.render("contact", { data: data });
});

// 404 page
app.get("*", (req, res) => {
  // res.sendFile(__dirname + "/404.html");
  res.render("404");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
