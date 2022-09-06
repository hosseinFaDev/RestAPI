const JWT = require('jsonwebtoken');

exports.sing = (data) => {
    return JWT.sign(data, process.env.APP_SECRECT);
}
exports.verify = (token) => {
    const tokenValue = token.split(' ')[1];
    try {
        const payload = JWT.verify(tokenValue, process.env.APP_SECRECT);
        return payload;
    } catch (error) {
        return false;
    }
}
exports.decode = (token) => {
    return JWT.decode(token, process.env.APP_SECRECT)
    
}