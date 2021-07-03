const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

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
    rating:{
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
    description:{ //synopsis
        type: String,
    }
},{ timestamps: true });

animeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Anime", animeSchema);