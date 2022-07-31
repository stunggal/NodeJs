const mongoose = require("mongoose");

// create schema contact
const contactSchema = mongoose.model("contact", {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = contactSchema;
