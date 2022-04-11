const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  userValidationResult,
  userValidator,
} = require("../middlewares/userValidator");

router.post(
  "/signup",
  userValidator,
  userValidationResult,
  userController.postSignup
);

router.post("/login", userController.postLogin);

module.exports = router;
