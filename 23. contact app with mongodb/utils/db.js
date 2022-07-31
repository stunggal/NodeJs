// connect to cloud mongodb with mongoose database = contacts and collection = contact
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://stunggal:stgl@stunggal.d5qrgo3.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});
