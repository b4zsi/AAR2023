const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');
const common = require('../modell/common');
const upload = require('../modell/upload');
const jwt = require('jsonwebtoken')

module.exports = function(app) {

    app.get(["/upload", "/uploadKonyv"], restrict, async (req, res) => {
        const kiado = await common.getAllKiado();
        const kategoria = await common.getAllKategoria();

        return res.render("upload/konyv", {
            kiado,
            kategoria,
        });
    });

    app.post("/uploadKonyv", async (req, res) => {
        let { nev, isbn, kiado, kategoria, oldalszam, mikor, ar } = req.body;

        await upload.uploadKonyv(nev, isbn, kiado, kategoria, oldalszam, mikor, ar);

        return res.redirect("upload");
    });

    app.get("/uploadSzerzo", async (req, res) => {

        return res.render("upload/szerzo");
    });

    app.post("/uploadSzerzo", async (req, res) => {
        let { vezetek, kereszt } = req.body;

        await upload.uploadSzerzo(vezetek, kereszt);

        return res.redirect("uploadSzerzo");
    });

    app.get("/uploadKiado", async (req, res) => {
        return res.render('upload/kiado');
    });

    app.post("/uploadKiado", async (req, res) => {
        await upload.uploadKiado(req.body.nev)

        return res.redirect('uploadKiado');
    });

    app.get("/uploadKategoria", async (req, res) => {
        return res.render('upload/kategoria');
    });

    app.post("/uploadKategoria", async (req, res) => {
        await upload.uploadKategoria(req.body.nev)
        return res.redirect('uploadKategoria');
    });


    app.get("/uploadBolt", async (req, res) => {
        return res.render('upload/bolt');
    });

    app.post("/uploadBolt", async (req, res) => {
        let { iranyitoszam, telepules, utca, telefonszam } = req.body;
        let nyitvatartas = [];

        for (i of ['he', 'ke', 'sze', 'csu', 'pe', 'szo', 'va']) {
            nyitvatartas.push(req.body[i + '1']);
            nyitvatartas.push(req.body[i + '2']);
        }

        let check = [iranyitoszam, telepules, utca, telefonszam].concat(nyitvatartas).map((i) => i === '');
        if (check.includes(true)) {
            return res.render('upload/bolt', {
                hibak: ["Kérem mindem mezőt töltsön ki!"],
                iranyitoszam,
                telepules,
                utca,
                nyitvatartas,
                telefonszam,
            });
        }

        await upload.uploadBolt(iranyitoszam, telepules, utca, telefonszam, nyitvatartas);
        return res.render('upload/bolt', {
            iranyitoszam,
            telepules,
            utca,
            nyitvatartas,
            telefonszam,
        });
        //return res.redirect('uploadBolt');
    });

}












