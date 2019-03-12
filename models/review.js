const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: String,
  rating: Integer,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Review", ReviewSchema);
