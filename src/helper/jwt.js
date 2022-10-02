const jwt = require('jsonwebtoken')
function generate_access_token(data) {
   let user = {
    id : data.id,
    username : data.username,
    email :data.email,

   }
    let payload = {
        user : user,
        role_id : data.role_id
    }
    const jwt_str = jwt.sign(
        payload,
        process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )

    return {
        user:user,
        accessToken : jwt_str
    }
}

module.exports = generate_access_token