const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { addSalary, getSalary, getOne,DeleteSalary} = require('./Controller');

Router.post("/monthly", checkToken, getSalary);
Router.post("/", checkToken, addSalary);
Router.post("/get", checkToken, getOne);
Router.post("/delete", checkToken, DeleteSalary);
module.exports = Router;