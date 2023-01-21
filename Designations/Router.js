const Router = require('express').Router();
const { checkToken } = require('../Middleware');
const { addDesignation, getDesignation } = require('./Controller');

Router.post("/", checkToken, addDesignation);
Router.get("/", checkToken, getDesignation);

module.exports = Router;