const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URL =
  "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/authdemo?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unkonwn error occurred!" });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
