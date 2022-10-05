const jwt = require('jsonwebtoken')
function generate_access_token(data) {
   let user = {
    id : data.id,
    username : data.username,
    email :data.email,
    role_id : data.role_id
   }
  
    const accessToken = jwt.sign(
        user,
        process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )

    return {user, accessToken}
    
}

module.exports = generate_access_token