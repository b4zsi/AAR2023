const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');
const jwt = require('jsonwebtoken')

module.exports = function(app) {

    app.get(["/upload", "/uploadKonyv"], restrict, async (req, res) => {
        const kiado = await db.getKiado();
        const kategoria = await db.getKategoria();

        return res.render("upload/konyv", {
            kiado,
            kategoria,
        });
    });

    app.post("/uploadKonyv", async (req, res) => {
        let { nev, isbn, kiado, kategoria, oldalszam, mikor, ar } = req.body;

        await db.uploadKonyv(nev, isbn, kiado, kategoria, oldalszam, mikor, ar);

        return res.redirect("upload");
    });

    app.get("/uploadSzerzo", async (req, res) => {

        return res.render("upload/szerzo");
    });

    app.post("/uploadSzerzo", async (req, res) => {
        let { vezetek, kereszt } = req.body;

        await db.uploadSzerzo(vezetek, kereszt);

        return res.redirect("uploadSzerzo");
    });

    app.get("/uploadKiado", async (req, res) => {
        return res.render('upload/kiado');
    });

    app.post("/uploadKiado", async (req, res) => {
        return res.send('upload/kiado');
        //return res.render('upload/kiado');
    });

    app.get("/uploadKategoria", async (req, res) => {
        return res.render('upload/kategoria');
    });

    app.get("/uploadBolt", async (req, res) => {
        return res.render('upload/bolt');
    });

}
