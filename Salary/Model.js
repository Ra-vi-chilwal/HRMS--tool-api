const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        month: { type: String, required: true },
        year: { type: String, required: true },
        empId: { type: String, required: true },
       	Payabledays : { type: String, required: true },
         Paiddays : { type: String, required: true },
        basic: { type: String, required: true },
        hra: { type: String, required: true },
        da: { type: String, required: true },
        convAll: { type: String, required: true, default: 0 },
        specialAll: { type: String, required: true, default: 0 },
        academicAll: { type: String, required: true, default: 0 },
        medRem: { type: String, required: true, default: 0 },
        foodAll: { type: String, required: true, default: 0 },
        uniformAll: { type: String, required: true, default: 0 },
        othAll: { type: String, required: true, default: 0 },
        grossSalary: { type: String, required: true, default: 0 },
        deduction: { type: String, required: true, default: 0 },
        pf: { type: String, required: true, default: 0 },
        lop: { type: String, required: true, default: 0 },
        lopDays: { type: String, required: true, default: 0 },
        bonus: { type: String, required: true, default: 0 },
        uan: { type: String, required: true, default: 0 },
        pfno: { type: String, required: true, default: 0 },
        arrear: { type: String, required: true, default: 0 },
        pfDeduction: { type: String, required: true, default: 0 },
        netSalary: { type: String, required: true, default: 0 },

    },
    { collection: "salary", timestamps: true }
);

const Salary = mongoose.model("Salary", SalarySchema);
module.exports = { Salary, SalarySchema };