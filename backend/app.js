require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const membersHandler = require("./routeHandler/membersHandler");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cors());
const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("connection successful");
  } catch (error) {
    console.log(error);
  }
};
mongoose.set("strictQuery", false);
connect();

app.use("/", membersHandler);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("header problem");
  } else {
    if (err.message) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "There was an error!" });
    }
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
