const { getPunchInOut, getMonthlyInOut } = require('./Controller');
const {checkToken} = require("../Middleware")
const Router = require('express').Router();
Router.post("/monthly",checkToken, getMonthlyInOut);
Router.post("/",checkToken, getPunchInOut);
module.exports = Router;
