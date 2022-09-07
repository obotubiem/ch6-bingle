require("dotenv").config();

const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const {User} = require("../database/models");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY_SECRET,
    },
    (jwtPayload, done) => {
    // return User.findByPk(jwtPayload.id)
     let isAdmin = User.findByPk(jwtPayload.id)
     if(isAdmin.is_admin = false){
        return 
     }
     return isAdmin
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

module.exports = passport;
