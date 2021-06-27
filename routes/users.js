const express = require("express");
const useController = require("../controller/user");
const userValidation = require("../middleware/validator/user");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router.get("/search", verifyUser, useController.searchUser);
router.post("/login", userValidation.validate("LOGIN"), useController.login);
router.post("/signup", userValidation.validate("SIGNUP"), useController.signup);

module.exports = router;