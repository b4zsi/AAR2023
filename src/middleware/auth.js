const jwtSecret = "adslfkjaslkdhfh23kjrh3iuy87y8t8ds7t765654ads54efasdgfhjsdfiasdf";
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.cookies.jwt;
    let curr_email, curr_role;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            curr_email = decodedToken.email;
            curr_role = decodedToken.role;
        });

        req.body.curr_email = curr_email;
        req.body.curr_role = curr_role;
    }
    next()
}

exports.restrict_only_admin = (req, res, next) => {
    if (!req.body.curr_email || req.body.curr_role !== 1) {
        return res.redirect('/index');
    }
    next();
}

exports.restrict_only_user = (req, res, next) => {
    if (!req.body.curr_email || req.body.curr_role !== 0) {
        return res.redirect('/index');
    }
    next();
}

exports.restrict_only_guest = (req, res, next) => {
    if (req.body.curr_email) {
        return res.redirect('/index');
    }
    next();
}

exports.restrict_only_logged_in = (req, res, next) => {
    if (!req.body.curr_email) {
        return res.redirect('/index');
    }
    next();
}

exports.jwtSecret = jwtSecret;
