const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  logoUrl: {
    type: String,
    required: true,
    unique: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  RemoteOffice: {
    type: String,
    required: true,
  },
  headCount: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],

    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  refUserId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});
jobSchema.pre('save', function(next) {
  // Convert each skill to lowercase
  this.skills = this.skills.map(skill => skill.toLowerCase());
  next();
});
module.exports = mongoose.model("Job", jobSchema);
