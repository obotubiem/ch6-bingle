require('dotenv').config();


const passport = require('passport')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const {User} = require('../database/models');
const user = require('../database/models/user');

const options ={
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),


    secretOrKey : process.env.JWT_KEY_SECRET
}

passport.use(new JwtStrategy(options,(payload, done)=>{
    user.findByPk(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))

module.exports = passport