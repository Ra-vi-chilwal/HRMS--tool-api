require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
console.log("token",token)
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {

      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send(err);
    }
    return next();
    
  },
  checkEmployee: (req, res, next) => {

    if (req.user.user.role.slug == "admin") {

      next();
    } else {
      return res.json({
        message: "You are not an Admin.",
        data: req.user.role,
      });
    }
  },

}
