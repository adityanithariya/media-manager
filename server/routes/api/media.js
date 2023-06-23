const express = require("express");
const router = express.Router();
const mediaController = require("../../controllers/mediaController");

router.route("/all").get(mediaController.getAllMedia);

router.route("/create").post(mediaController.createMedia);

router
    .route("/:id")
    .get(mediaController.getMedia)
    .post(mediaController.updateMedia);

router.route("/view").get(mediaController.increaseViews);

module.exports = router;
