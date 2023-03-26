//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing routes to the server
const cffRoutes = require("./routes/cff-routes");
const userRoutes = require("./routes/users-routes");

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
app.use(bodyParser.json({ limit: "50mb" }));

// For CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

// routes
app.use("/api/cff", cffRoutes);
app.use("/api/users", userRoutes);

// connecting to mongoDB
mongoose
  .connect(
    "mongodb+srv://FieldofHonor:oBOfvWF7zwe8KkLa@cluster0.9paepmq.mongodb.net/Fieldofhonor?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("Server Started on port 8000.");
    });
  })
  .catch((error) => {
    console.log(error);
  });
