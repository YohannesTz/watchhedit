const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    average_rating:{
        type: String,
    },
    cover_image:{
        type: String,
        default: "default.png",
    },
    derscription:{ //synopsis
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{ timestamps: true });

movieSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Movie", movieSchema);