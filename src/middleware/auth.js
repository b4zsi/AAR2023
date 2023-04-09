const jwtSecret = "adslfkjaslkdhfh23kjrh3iuy87y8t8ds7t765654ads54efasdgfhjsdfiasdf";
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.cookies.jwt;
    let curr_email, curr_role;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            curr_email = decodedToken.email;
        });

        req.body.curr_email = curr_email;
    }
    next()
}

exports.restrict = (req, res, next) => {
    if (!req.body.curr_email) {
        res.redirect('login');
    }
}

exports.jwtSecret = jwtSecret;
