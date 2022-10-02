const jwt = require("jsonwebtoken");
const res_data = require("../helper/respons_data");

let getToken = (authHeader) => {
  let headerSplit = authHeader.split(" ");
  if (headerSplit.length > 1) {
    return headerSplit[1];
  }
  return headerSplit[0];
};

module.exports = {
  authorization: (req, res, next) => {
    if(typeof req.headers['authorization'] != "string") {
      return res.status(401).json(res_data.failed("unauthorized", null));}

    const token = getToken (req.headers["authorization"])
    let payload = null
    try {
      payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
      req.user = payload
      req.role_id = payload.role_id
      next()
    } catch (error) {
      return res.status(401).json(res_data.failed("unauthorized", null));
    }
  },
  authentication: {
    admin: (req, res, next) => {
      if (req.role_id == 1){
        return res.status(401).json("Unauthorized")
      } 
      next()
      
    },
    customer: (req, res, next) => {
      if (req.role_id == 2) return next();
      return next({
        error: "Unauthorized",
        authType: "Admin",
      });
    },
  },
};
