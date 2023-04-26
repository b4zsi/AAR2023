const auth = require("../middleware/auth.js")

module.exports = function(app) {


    app.use(auth.auth, (req, res, next) => {
        res.locals.header = {
            "index": "Főoldal",
            "konyv": "Könyv",
            "fiok": "Fiók",
            "szerzo": "Szerzők",
            "kiado": "Kiadók",
            "kategoria": "Kategoriák",
            "nyitvatartas": "Nyitvatartás",
            "bolt": "Bolt",
            "upload": "Feltöltés",
            "login": "Bejelentkezés",
            "regist": "Regisztráció",
            "logout": "Kilépés",
        };

        res.locals.guest_only = [
            "login",
            "regist",
        ];
        res.locals.user_only = [
            "logout",
            "fiok",
        ];
        res.locals.admin_only = [
            //"fiok", "nyitvatartas"
        ];

        res.locals.oldal = req.path.replace('/', '')
        res.locals.curr_email = req.body.curr_email;
        res.locals.curr_role = req.body.curr_role;
        res.locals.szerkeszt = req.query.szerkeszt;
        next()
    });

    require("./user")(app)
    require("./oldalak")(app)
}
