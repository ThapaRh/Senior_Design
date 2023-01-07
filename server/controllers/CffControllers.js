const CFF = require("../models/CFFModal");
const mongoose = require("mongoose");

// adding a CFF
const createCFF = async (req, res) => {
  const cff = new CFF();
  cff.FirstName = req.body.FirstName;
  cff.LastName = req.body.LastName;

  cff.save(function (err, temp) {
    if (err) {
      res.send("Error creating a CFF");
    } else {
      console.log(temp);
      res.send(temp);
    }
  });

  // return res.json({ status: "ok" });
};

const getCFF = async (req, res) => {
  res.send("<h1>Hello World</h1>");
};

module.exports = {
  createCFF,
  getCFF,
};
