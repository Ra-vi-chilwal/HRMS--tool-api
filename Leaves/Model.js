const mongoose = require("mongoose");
// const { Users } = require("../Auth/Model");

const LeavesSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    empId: { type: String, required: true, ref: "Users" },
    numberofLeaves: { type: mongoose.Types.Decimal128, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    leaveType: { type: String, required: true },
    reportingManager: { type: String, required: true }
  },
  { collection: "leaves", timestamps: true }
);

const Leaves = mongoose.model("Leaves", LeavesSchema);
module.exports = { Leaves, LeavesSchema };