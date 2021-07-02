const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (type) => {
    switch (type) {
        case "GET":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid anime ID"),
            ];
        case "CREATE":
            return [
                body("title_en").not().isEmpty().withMessage("Anime name is required"),
                body("title_enjp").optional().not().isEmpty().withMessage("Anime Japaneese english name is required"),
                body("title_jajp").optional().not().isEmpty().withMessage("Anime Japaneese name is required"),
                body("average_rating").not().isEmpty().withMessage("Average rating is required"),
                body("episode_count").not().isEmpty().withMessage("Episode count is required"),
                body("description").not().isEmpty().withMessage("Description count is required")
            ];
        case "UPDATE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid anime ID"),
                body("title_en").optional().not().isEmpty().withMessage("Anime name is required"),
                body("title_enjp").optional().not().isEmpty().withMessage("Anime Japaneese english name is required"),
                body("title_jajp").optional().not().isEmpty().withMessage("Anime Japaneese name is required"),
                body("average_rating").optional().not().isEmpty().withMessage("Average rating is required"),
                body("episode_count").optional().not().isEmpty().withMessage("Episode count is required"),
                body("description").optional().not().isEmpty().withMessage("Description count is required")
            ];
        case "DELETE":
            return [
                param("id").custom((value) => {
                    return mongoose.Types.ObjectId.isValid(value);
                }).withMessage("Invalid anime ID")
            ];
        default:
            return [];
    }
}