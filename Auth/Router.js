const { register, login,getuser,EditUser, DeleteUser } = require("./Controller");
const { checkToken} = require('../Middleware');
const AuthRouter = require("express").Router();
AuthRouter.post("/register",checkToken, register);
AuthRouter.post("/login", login);
AuthRouter.get("/get", getuser);
AuthRouter.delete("/delete/:id", DeleteUser);

AuthRouter.put("/edit/:id", EditUser);
//AuthRouter.post("/changepassword",checkToken, changePassword);
module.exports = AuthRouter;