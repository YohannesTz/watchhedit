const express = require("express");
const animeController = require("../controller/anime");
const animeValidation = require("../middleware/validator/anime");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(verifyUser, animeController.getAllAnime)
    .post(verifyUser,
        animeController.uploadImage,
        animeValidation.validate("CREATE"),
        animeController.createAnime);

router
    .route("/:id")
    .get(verifyUser, animeValidation.validate("GET"), animeController.getAnime)
    .patch(
        verifyUser,
        animeValidation.validate("UPDATE"),
        animeController.updateAnime
    )
    .delete(
        verifyUser,
        animeValidation.validate("DELETE"),
        animeController.updateAnime
    );
module.exports = router;