const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { getRole, addRole,getRolebyId } = require('./Controller');

Router.post("/add", checkToken, addRole);
Router.get("/", checkToken, getRole);
Router.get("/get/:id", checkToken, getRolebyId);
module.exports = Router;