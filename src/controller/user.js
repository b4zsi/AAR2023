const db = require('../modell/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../middleware/auth').jwtSecret
const verifier = require('../config/verify');
const { restrict_only_guest, restrict_only_logged_in } = require('../middleware/auth');

module.exports = function(app) {
    app.get("/regist", restrict_only_guest, async (req, res) => {
        return res.render('regist.ejs', {
            cim: "Regisztracio:"
        });
    });

    app.post("/regist", restrict_only_guest, async (req, res) => {
        const {email, knev, vnev, jelszo, jelszo2} = req.body;
        let hiba = [];

        if (!email || !knev || !vnev || !jelszo || !jelszo2) {
            hiba.push("Hiányzó adatok!");
            return res.render('regist', {
                hiba: hiba
            });
        }

        const user = await db.getFiokByEmail(email);

        if(user.rows.length !== 0){
            hiba.push("Ez az email cím már foglalt!");
        }

        if(!verifier.isEmail(email)){
            hiba.push("Helytelen email cím. Az email címnek ilyen formát kell követnie: valami@valami.valami");
        }

        if(!verifier.PasswordVerify(jelszo)){
            hiba.push("A jelszónak legalább 8 karakter hosszúnak kell lennie és tartalmazni kell egy számot, illetve kis- és nagybetűt");
        }

        if(!verifier.isName(knev) || !verifier.isName(vnev)){
            hiba.push("A név mezőkben minimum 2 karakter hossz és maximum 30 karakter hossz fogadunk el, speciális karaktereket ne tartalmazzon!")
        }

        if (jelszo !== jelszo2) {
            hiba.push("A két jelszó nem egyezik");
        }

        if (!hiba.length) {
            await bcrypt.hash(jelszo, 10).then(function (hash) {
                db.addUser(email, hash, knev, vnev);
            });

            return res.redirect('login');
        } else {
            return res.render('regist', { hiba: hiba });
        }
    });

    app.get("/login", restrict_only_guest, async (req, res) => {
        return res.render('login.ejs');
    });

    app.post("/login", restrict_only_guest, async (req, res) => {
        let { email, jelszo } = req.body;
        if (!email || !jelszo) {
            return res.render('login', {
                email,
                hiba: ["Kérem mindem mezőt töltsön ki!"]
            });
        }
        const user = await db.getFiokByEmail(email);
        if (!user || !user['rows'].length) {
            return res.render('login', {
                email,
                hiba: ["Hibás felhasználónév vagy jelszó!"]
            });
        }

        const match = await bcrypt.compare(jelszo, user['rows'][0][2]);
        if (match) {
            const token = jwt.sign({
                email: user['rows'][0][1],
                role: user['rows'][0][7],
            },
                secret
            );

            res.cookie("jwt", token, {
                httpOnly: true
            });
        } else {
            return res.render('login', {
                email: email,
                hiba: ["Hibás felhasználónév vagy jelszó!"]
            });
        }
        return res.redirect('index');
    });

    app.get("/logout", restrict_only_logged_in, (req, res) => {
        res.cookie("jwt", "", {
            maxAge: "1"
        })
        return res.redirect("/")
    });
}
