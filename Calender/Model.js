const mongoose = require("mongoose");
const CalenderSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        location: { type: String, required: true },
        year: { type: String, required: true },
        date: { type: String, required: true },
        holiday: { type: String, required: true },
    },
    { collection: "calender", timestamps: true }
);

const Calender = mongoose.model("Calender", CalenderSchema);
module.exports = { Calender, CalenderSchema };