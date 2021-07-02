const { body, param } = require("express-validator");
const mongoose = require("mongoose");


exports.validate = (type) => {
    switch(type) {
        case "GET":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid movie ID"),
            ];
        case "CREATE":
            return [
                body("title").not().isEmpty().withMessage("Movie name is required"),
                body("description").not().isEmpty().withMessage("Movie Description"),
                body("average_rating").not().isEmpty().withMessage("Average rating is required")
            ];
        case "UPDATE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid movie ID"),
                body("title").optional().not().isEmpty().withMessage("Title is required"),
                body("description").optional().not().isEmpty().withMessage("Description is required"),
            ];
        case "DELETE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                })
                .withMessage("Invalid movie id")
            ];
        default:
            return [];
    }
}