const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    departmentName: { type: String, required: true }
  },
  { collection: "department", timestamps: true }
);

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = { Department, DepartmentSchema };