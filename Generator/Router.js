const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { generateSlip } = require('./Controller');


Router.post("/", checkToken, generateSlip);
module.exports = Router;