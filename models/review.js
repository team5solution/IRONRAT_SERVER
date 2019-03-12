const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: String,
<<<<<<< HEAD
  rating: Number,
  comment: String
=======
  rating: Integer,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
>>>>>>> master
});
module.exports = mongoose.model("Review", ReviewSchema);
