var jwt = require('jsonwebtoken');
var toID = require('postgraphql/dist/graphql/types').toID

module.exports = jwtSecret => (req, res, next) => {
    if (!req.user) return next();

    var token = jwt.sign(req.user, jwtSecret);
    res.json({
        user_rowId: req.user.id,
        user_id: toID('person', [req.user.id]),
        token,
        aud: 'postgraphql'
    })

    next();
};
