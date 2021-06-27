const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    title_en:{
        type: String,
    },
    title_enjp:{
        type: String,
    },
    title_jajp:{
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
    episode_count:{
        type: Number,
    },
    youtube_url:{
        type: String,
    },
    description:{ //synopsis
        type: String,
    }
},{ timestamps: true });

module.exports = mongoose.model("Anime", animeSchema);