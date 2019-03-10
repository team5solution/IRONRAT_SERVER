const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    name: String,
    email: String,
    appointment_date : Date
});
module.exports = Product = mongoose.model("Appointment", AppointmentSchema);