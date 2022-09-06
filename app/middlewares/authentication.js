const tokenService = require('../services/tokenService');
module.exports = (req, res, next) => {
    if (!('authentication' in req.headers)) {
        return res.status(401).send({
            errer: true,
            code: 'Unauthorized',
            message: 'You Not authorized'
        })
    }
    const token = req.headers.authentication;
    const result = tokenService.verify(token);
    if (!result) {
        return res.status(401).send({
            errer: true,
            code: 'Unauthorized',
            message: 'You token is not authorized'
        })
    }
    next();
}