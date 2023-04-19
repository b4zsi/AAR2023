const db = require('../modell/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../middleware/auth').jwtSecret

module.exports = function(app) {
    app.get("/regist", async (req, res) => {

        return res.render('regist.ejs', {
            cim: "Regisztracio:"
        });
    });

    app.post("/regist", async (req, res) => {
        let { email_cim, knev, vnev, jelszo, jelszo2 } = req.body;
        if (!email_cim || !knev || !vnev || !jelszo || !jelszo2) {
            return res.render('regist', {
                hiba: "Hiányzó adatok!"
            });
        }

        const user = await db.getFiokByEmail(email_cim);
        if (user && user['rows'].length) {
            return res.render('regist', {
                email_cim,
                hiba: "Iilyen email-cím már szerepel az adatbázisban!"
            });
        }

        if (jelszo !== jelszo2) {
            return res.render('regist', {
                email_cim: email_cim,
                hiba: "A két jelszó nem egyezik!"
            });
        }

        await bcrypt.hash(jelszo, 10).then(function(hash) {
            db.addUser(email_cim, hash, knev, vnev);
        });
        next('login');
    });

    app.get("/login", async (req, res) => {
        return res.render('login.ejs');
    });

    app.post("/login", async (req, res) => {
        let { email_cim, jelszo } = req.body;
        if (!email_cim || !jelszo) {
            return res.render('login', {
                email_cim,
                hiba: ["Kérem mindem mezőt töltsön ki!"]
            });
        }
        const user = await db.getFiokByEmail(email_cim);
        if (!user || !user['rows'].length) {
            return res.render('login', {
                email_cim,
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
                email: email_cim,
                hiba: ["Hibás felhasználónév vagy jelszó!"]
            });
        }
        return res.redirect('index');
    });

    app.get("/logout", (req, res) => {
        res.cookie("jwt", "", {
            maxAge: "1"
        })
        return res.redirect("/")
    });
}
