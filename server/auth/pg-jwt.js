var jwt = require('jsonwebtoken');

module.exports = jwtSecret => (req, res, next) => {
    if (!req.user) return next();

    var token = jwt.sign(req.user, jwtSecret);
    res.json({user: req.user, token})

    next();
};
