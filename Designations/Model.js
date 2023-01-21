const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    designation: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department",},
  },
  { collection: "designation", timestamps: true }
);

const Designation = mongoose.model("Designation", DesignationSchema);
module.exports = { Designation, DesignationSchema };