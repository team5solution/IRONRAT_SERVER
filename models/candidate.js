const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  name: String,
  email: String,
  resume: [String],
  jobId: Schema.ObjectId
});
module.exports = mongoose.model("Candidate", CandidateSchema);
