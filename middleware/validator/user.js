const { body } = require("express-validator");

exports.validate = (type) => {
    switch(type){
        case "LOGIN":
            return [
                body("email").isEmail().withMessage("Invalid email address"),
                body("password").not().isEmpty().withMessage("Passsord is required"),
            ];
        case "SIGNUP":
            return [
                body("firstName").not().isEmpty().withMessage("First Name is required"),
                body("lastName").not().isEmpty().withMessage("Last Name is required"),
                body("email").not().isEmpty().withMessage("Email is required"),
                body("email").isEmail().withMessage("Invalid email address"),
                body("password").not().isEmpty().withMessage("Password is required"),
            ];
        default:
            return [];
    }
};