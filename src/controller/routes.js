const auth = require("../middleware/auth.js")
const fs = require('fs');
const path = require('path');


module.exports = function(app) {
    app.use(auth.auth, (req, res, next) => {
        res.locals.header = {
            "index": "Főoldal",
            "kosar": "Kosár",
            "konyv": "Könyvek",
            "szerzo": "Szerzők",
            "kiado": "Kiadók",
            "statisztika": "Statisztika",
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
            "fiok",
        ];
        res.locals.guest_and_user_only = [
            "index",
        ];
        res.locals.user_and_admin_only = [
            "logout",
            "kosar"
        ];
        res.locals.admin_only = [
            "konyv",
            "upload",
            "fiok",
            "statisztika"
        ];

        res.locals.oldalak = {
            "konyv": "Könyv",
            "szerzo": "Szerző",
            "statisztika": "Statisztika",
            "kiado": "Kiadó",
            "kategoria": "Kategória",
            "bolt": "Bolt",
        }

        res.locals.oldal = req.path.replace('/', '')
        res.locals.curr_email = req.body.curr_email;
        res.locals.curr_role = req.body.curr_role;
        res.locals.szerkeszt = req.query.szerkeszt;

        next()
    });

    const folderName = "controller";
    let all_routes = []
    fs.readdirSync(folderName).forEach(function(file) {

        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(name);
        } else if (file.toLowerCase().indexOf('.js') && file !== "routes.js") {
            all_routes.push( './' + file.substring(0, file.length-3));
        }
    });    

    all_routes.forEach( (i) => {
        require(i)(app);
    })

}
