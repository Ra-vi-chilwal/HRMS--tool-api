const Router = require("express").Router();
const { checkToken } = require("../Middleware");
const { addCalender, getCalender } = require("./Controller");
Router.post("/", checkToken, addCalender);
Router.get("/", checkToken, getCalender);
module.exports = Router;