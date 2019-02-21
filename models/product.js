const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  type: String,
  description: String,
  images: [String],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Product = mongoose.model("Product", ProductSchema);
