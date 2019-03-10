const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema =  new Schema({
    name: String,
    email: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
      }

});
module.exports = Product = mongoose.model("Message", MessageSchema);