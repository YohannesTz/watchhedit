const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    average_rating:{
        type: String,
    },
    poster_image:{
        type: String,
    },
    cover_image:{
        type: String,
    },
    derscription:{ //synopsis
        type: String,
    }
},{ timestamps: true });

module.exports = mongoose.model("Anime", movieSchema);