//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cffRoutes = require("./routes/router");

// switching off strictQuery for the future
mongoose.set("strictQuery", false);

// creating express app
const app = express();

// using bodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.use("/api/cff", cffRoutes);

//connecting to mongoDB
mongoose
  .connect(
    "mongodb+srv://FieldOfHonor1:Cookie1234@cluster0.7cfzpvb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3001, () => {
      console.log("Server Started on port 3001.");
    });
  })
  .catch((error) => {
    console.log(error);
  });