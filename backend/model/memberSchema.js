const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^([a-zA-Z0-9]+([._]?[a-zA-Z0-9])*[._]?)@\w+[.][a-zA-Z]+(\.[a-zA-Z]+)*$/g,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
