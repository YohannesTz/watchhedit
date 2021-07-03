const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (type) => {
    switch (type) {
        case "GET":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid book ID"),
            ];
        case "CREATE":
            return [
                body("title").not().isEmpty().withMessage("Book name is required"),
                body("average_rating").not().isEmpty().withMessage("Book average rating is required"),
                body("description").not().isEmpty().withMessage("Description count is required")
            ];
        case "UPDATE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid book ID"),
                body("title").optional().not().isEmpty().withMessage("Book name is required"),
                body("average_rating").optional().not().isEmpty().withMessage("Book Average rating is required"),
                body("description").optional().not().isEmpty().withMessage("Book is required")
            ];
        case "DELETE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid book ID")
            ];
        default:
            return [];
    }
};