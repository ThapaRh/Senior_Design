const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "uploads/" });

// requiring function calls from controllers
const {
  createCFF,
  getCFF,
  deleteCFF,
  updateCFF,
  handleFileUpload,
} = require("../controllers/CffControllers");

const router = express.Router();

// route to handle the csv data
router.post("/upload", handleFileUpload);

// route to create a CFF
router.post("/add", createCFF);

// route to get a CFF
router.get("/:id", getCFF);

// route to delete a CFF
router.delete("/:id", deleteCFF);

//route to update CFF info
router.patch("/:id", updateCFF);

module.exports = router;
