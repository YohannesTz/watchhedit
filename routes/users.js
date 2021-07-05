const express = require("express");
const userController = require("../controller/user");
const userValidation = require("../middleware/validator/user");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/search", verifyUser, userController.searchUser);
router.post("/login", userValidation.validate("LOGIN"), userController.login);
router.post("/signup", userValidation.validate("SIGNUP"), userController.signup);
router.post("/movieList", verifyUser, userController.createMovieList);
router.post("/bookList", verifyUser, userController.createBookList);
router.post("/animeList", verifyUser, userController.createAnimeList);

module.exports = router;