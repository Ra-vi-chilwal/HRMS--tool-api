const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { applyLeave, leavesList, getLeaveOfEmpByMonth, getLeave, updateStatus, userLeave, addLeave } = require('./Controller');

Router.post("/apply", checkToken, applyLeave);
Router.post("/add", checkToken, addLeave);
Router.get("/leaveslist", checkToken, leavesList);
Router.get("/get", checkToken, getLeave);
Router.put("/update", checkToken, updateStatus);
Router.get("/user", checkToken, userLeave);
Router.post("/get-leaves", checkToken, getLeaveOfEmpByMonth);


module.exports = Router;