const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  name: String,
  email: String,
  appointment_date: Date
});
<<<<<<< HEAD

=======
>>>>>>> master
module.exports = mongoose.model("Appointment", AppointmentSchema);
