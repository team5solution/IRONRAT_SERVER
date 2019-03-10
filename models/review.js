const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: String,
    rating: Integer,
    comment: String
});
module.exports = mongoose.model("Review", ReviewSchema);