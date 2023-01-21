const express = require("express");
const cors = require("cors");
const connect = require("./Config/connect");
var bodyParser = require('body-parser')
const path = require("path")
require("dotenv").config()
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: true,
    parameterLimit: 1500000,
  })
);


const attendanceRouter = require("./Attendance/Router")
const AuthRouter = require("./Auth/Router");
const roleRouter = require("./Role/Router");
const departmentRouter = require("./Departments/Router");
const designationRouter = require("./Designations/Router");
const verifyRouter = require("./verify/Router");
const salaryRouter = require("./Salary/Router");
const pdfRouter = require("./Generator/Router");
const LeavesRouter = require("./Leaves/Router");
const  CalenderRouter= require("./Calender/Router");
connect();
app.use(cors());
app.use("/auth", AuthRouter)
app.use("/role", roleRouter);
app.use("/attendance", attendanceRouter)
app.use("/department", departmentRouter);
app.use("/designation", designationRouter);
app.use("/verify", verifyRouter);
app.use("/salary", salaryRouter);
app.use("/generate", pdfRouter);
app.use("/leave",LeavesRouter);
app.use("/calender",CalenderRouter);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, () => {
  console.log("Port is running on 5000...");
});
