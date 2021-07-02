const express = require("express");
const movieController = require("../controller/movie");
const movieValidation = require("../middleware/validator/movie");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(verifyUser, movieController.getAllMovies)
    .post(verifyUser, 
        movieController.uploadImage,
        movieValidation.validate("CREATE"),
        movieController.createMovie);

router
    .route("/:id")
    .get(verifyUser, movieValidation.validate("GET"), movieController.getMovie)
    .patch(
        verifyUser,
        movieValidation.validate("UPDATE"),
        movieController.updateMovie
    )
    .delete(
        verifyUser,
        movieValidation.validate("DELETE"),
        movieController.deleteMovie
    );
module.exports = router;