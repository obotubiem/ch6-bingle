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
    if (req.headers["authorization"]!= "string") {
      return(res.status(401).json(res_data.failed("unauthrizd", null)));
    }
    let token = getToken(req.headers["authorization"]);
    let payload = null;
    try {
      payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
    } catch (error) {
      return res.status(401).json(res_data.failed("unauthrized", null));
    }
    req.user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
    next()
  },
  authentication: {
    admin: (req, res, next) => {
      if (req.user.role === 1) return next();
      return next({
        error: "Unauthorized",
        authType: "Admin",
      });
    },
    seller: (req, res, next) => {
      if (req.user.role === 2) return next();
      return next({
        error: "Unauthorized",
        authType: "Admin",
      });
    },
  },
};
