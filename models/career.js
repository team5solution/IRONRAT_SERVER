const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CareerSchema = new Schema ({
    title: String,
    description: String,
    images: [String],
    candidates: [String]
});

module.exports = Product = mongoose.model("Career", CareerSchema);