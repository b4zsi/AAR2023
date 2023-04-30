const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');

const common_db = require('../modell/common');
const upload_db = require('../modell/upload');
const jwt = require('jsonwebtoken')
const path = require("path");
const fs = require("fs");

const upload = require('../config/multer').multer;

module.exports = function(app) {

    app.get("/uploadKonyv", restrict, async (req, res) => {
        const kiado = await common_db.getAllKiado();
        const kategoria = await common_db.getAllKategoria();

        return res.render("upload/konyv", {
            kiado,
            kategoria,
        });
    });

    app.post("/uploadKonyv", upload.single("kep"), async (req, res) => {
        let { nev, isbn, kiado, kategoria, oldalszam, mikor, ar } = req.body;
        const uccso = await upload_db.getLastKepIndex();

        if(req.file){
            const tempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.join(__dirname, "../public/img/" + (uccso+1) + ext);

            if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
              fs.rename(tempPath, targetPath, err => {
                if (err) return res.render('/upload/konyv',{});
              });
            } else {
              fs.unlink(tempPath);
            }
            
            await upload_db.uploadKonyv(nev, isbn, kiado, kategoria, oldalszam, mikor, ((uccso+1)+ext), ar);
            return res.redirect('/uploadKonyv');
        }else{

        }



        return res.redirect("uploadKonyv");
    });

    app.get("/uploadSzerzo", async (req, res) => {

        return res.render("upload/szerzo");
    });

    app.post("/uploadSzerzo", async (req, res) => {
        let { vezetek, kereszt } = req.body;

        await upload_db.uploadSzerzo(vezetek, kereszt);

        return res.redirect("uploadSzerzo");
    });

    app.get("/uploadKiado", async (req, res) => {
        return res.render('upload/kiado');
    });

    app.post("/uploadKiado", async (req, res) => {
        await upload_db.uploadKiado(req.body.nev)

        return res.redirect('uploadKiado');
    });

    app.get("/uploadKategoria", async (req, res) => {
        return res.render('upload/kategoria');
    });

    app.post("/uploadKategoria", async (req, res) => {
        await upload_db.uploadKategoria(req.body.nev)
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

        await upload_db.uploadBolt(iranyitoszam, telepules, utca, telefonszam, nyitvatartas);
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












