require('dotenv').config();


const bcrypt = require("bcrypt")
const res_data = require('../utils/respons_data')
const jwt = require("jsonwebtoken")

module.exports = {
    login: async (req, res, next) => {
        try {
            let username = req.body.username
            let password = req.body.password

            let user = await req.userUC.getUserByUsername(username)
            if (user === null) {
                return res
                    .status(400)
                    .json(res_data.failed('username or password incorrect', user))
            }
            if (bcrypt.compareSync(password, user.password) !== true) {
                return res
                    .json(res_data.failed('username or password incorrect', user))
            }
            const accessTeken = jwt.sign(
                { id : user.id,
                username: user.username },
                process.env.JWT_KEY_SECRET,
                {
                  expiresIn: '6h',
                },
              );
          
             
              res.json(res_data.success({ id: user.id, token: accessTeken }));
        } catch (error) {
            next(error)
        }
    },
    register: async (req, res, next) => {
        try {

            let user = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                photo_profile:req.file.filename,
                is_admin : false
            }
            if (req.body.password !== req.body.confrimPassword) {
                return res
                    .status(400)
                    .json(res_data.failed('password and confirmPassword incorrect', user))
            }
            let password = bcrypt.hashSync(req.body.password, 10);
            let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10);

            user.password = password
            user.confrimPassword = confrimPassword

            let user_res = await req.userUC.getUserByUsername(user.username)
            if (user_res !== null) {
                return res
                    .status(400)
                    .json(res_data.failed('user already use', user))
            }

            let create_res = await req.userUC.createUser(user)
            if (create_res.is_success !== true) {
                return res
                    .status(500)
                    .json(res_data.failed('somthing went wrong', user))
            }
       
            
            res.json(res_data.success(user))
        } catch (error) {
            next(error)
        }
    }


}
