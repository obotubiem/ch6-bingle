const jwt = require('jsonwebtoken')
function generate_access_token(data) {
   let user = {
    id : data.id,
    firsName :data.firsName,
    lastName : data.lastName,
    username : data.username,
    email :data.email,
    phone : data.phone,
    avatar : data.avatar,
    role_id : data.role_id
   }
  
    const token = jwt.sign(
        user,
        process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )
    return {user : user ,token : token}
    
}

module.exports = generate_access_token