const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, apiController.getApi);

router.post("/addpost", validateToken, apiController.addPost);

module.exports = router;
