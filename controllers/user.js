const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({ error: "user has existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    return res.status(200).json({ messgae: "signup successfully" });
  } catch (err) {
    const error = new Error(err);
    error.code = 400;
    throw error;
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      // return res.status(404).json({ error: "user does not exist" });
      const error = new Error(err);
      error.code = 400;
      return next(error);
    }
    const match = await bcrypt.compare(password, user.password);
    let id = user._id.toString();

    if (match) {
      token = sign(
        {
          email: user.email,
          id: id,
        },
        "importantsecret"
      );
      res.json({ token: token, email: email, id: id });
    }
  } catch (err) {
    const error = new Error(err);
    error.code = 400;
    throw error;
  }
};
