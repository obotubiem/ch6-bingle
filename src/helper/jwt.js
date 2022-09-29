const jwt = require('jsonwebtoken')
function generate_access_token(data) {
    const accessToken = jwt.sign(
        data,
        process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )

    return accessToken
}

module.exports = generate_access_token