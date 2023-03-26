const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { getUsers, signup, login } = require("../controllers/usersController");

//route to get user
router.get("/", getUsers);

//route to signup
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

//route to post to
router.post("/login", login);

module.exports = router;
