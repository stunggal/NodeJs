const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// about page
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

// contact page
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

// 404 page
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/404.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
