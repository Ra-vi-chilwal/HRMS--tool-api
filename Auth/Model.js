const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  empId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profile: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  salary: { type: String, required: true },
  doj: { type: String, required: true },
  officeLocation: { type: String, required: true },
  reportingManager: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: "Designation", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  biometricId: { type: String, required: true },
  pancard: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  remainLeaves: {
    SKL: { type: Number, default: 0 },
    CSL: { type: Number, default: 0 },
    PVL: { type: Number, default: 0 },
    MTL: { type: Number, default: 0 },
    MGL: { type: Number, default: 0 },
    LWP: { type: Number, default: 0 },
  }
}, { collection: "users", timestamps: true });
const Users = mongoose.model("Users", userSchema);
module.exports = { Users, userSchema }
