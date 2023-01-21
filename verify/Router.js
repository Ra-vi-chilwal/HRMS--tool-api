const { verify } = require("./Controller");
const { checkToken } = require('../Middleware');
const Router = require("express").Router();
Router.post("/", verify);

module.exports = Router;