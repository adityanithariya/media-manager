const express = require("express");
const router = express.Router();
const userController = require("../../controllers/mediaController");

router.route("/add-media/:id").get(userController.addMedia);

module.exports = router;
