const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    avrage_rating:{
        type: String,
    },
    description:{
        type: String,
    },
    cover_image:{
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{ timestamps: true });

bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Book", bookSchema);