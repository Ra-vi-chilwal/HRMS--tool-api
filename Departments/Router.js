const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { getDepartment, addDepartment } = require('./Controller');
Router.get("/", checkToken, getDepartment);
Router.post("/", checkToken, addDepartment);
module.exports = Router;
