const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
        //access_token là key bí mật, expiresIn là thời gian hết hạn
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
        //access_token là key bí mật, expiresIn là thời gian hết hạn
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}