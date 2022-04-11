const { check, validationResult } = require("express-validator");

exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array();
    console.log(error);
    return res.json({ error: error });
  }
  next();
};

exports.userValidator = [
  check("email").isEmail().withMessage("please enter a valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Please enter a password at least 5 characters")
    .isAlphanumeric(),
  check("username")
    .isLength({ min: 2 })
    .withMessage("Please enter a name at least 2 characters")
    .trim(),
];
