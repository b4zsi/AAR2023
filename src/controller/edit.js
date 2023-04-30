const { restrict_only_admin } = require('../middleware/auth');
const edit_db = require('../modell/edit');
const common_db = require('../modell/common');
const upload = require('../config/multer').multer;
const fs = require("fs");
const path = require("path");

module.exports = function(app) {

    app.post("/editKonyv", restrict_only_admin, upload.single("kep"), async (req, res) => {
        let { nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, kep } = req.body;


        let old = await common_db.getKonyvByISBN(isbn);
        old = old['rows'][0][old['metaData'].map(x => x['name']).indexOf('KEP')];

        if (req.file) {
            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "../public/img/" + old);

            const ext = path.extname(req.file.originalname).toLowerCase();
            if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
                //fs.unlink('../public/img/' + old);
                fs.rename(tempPath, targetPath, err => {
                    if (err) return res.render('/upload/konyv', {});
                });
            }
        }

        await edit_db.editKonyv(nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, kep);

        return res.redirect('/konyv?id=' + isbn);
    });

    app.get("/deleteKonyv", restrict_only_admin, async  (req, res) => {
        let { id } = req.query

        let old = await common_db.getKonyvByISBN(id);
        old = old['rows'][0][old['metaData'].map(x => x['name']).indexOf('KEP')];
        let route = "../public/img/" + old;

        if(fs.existsSync(route)){
            fs.unlinkSync(route);
        }else{
            console.log("delete kep: nem letezik a file: " + route);
        }

        await edit_db.deleteKonyv(id);


        return res.redirect('/konyv');
    });

    app.post("/editSzerzo", restrict_only_admin, async  (req, res) => {
        let {id, vez, ker} = req.body;

        await edit_db.editSzerzo(id, vez, ker);

        res.redirect('/szerzo');
        
    });

    app.get("/deleteSzerzo", restrict_only_admin, async  (req, res) => {

        await edit_db.deleteSzerzo(req.query.id);

        return res.redirect('/szerzo');
            

    });

    app.post("/editKiado", restrict_only_admin, async  (req, res) => {
        let {id, nev} = req.body;

        await edit_db.editKiado(id, nev);

        res.redirect('/kiado');
        
    });

    app.get("/deleteKiado", restrict_only_admin, async (req, res) => {

        await edit_db.deleteKiado(req.query.id);

        return res.redirect('/kiado');
            

    });

    app.post("/editKategoria", restrict_only_admin, async  (req, res) => {
        let {id, nev} = req.body;

        await edit_db.editKategoria(id, nev);

        res.redirect('/kategoria');
        
    });

    app.get("/deleteKategoria", restrict_only_admin, async  (req, res) => {

        await edit_db.deleteKategoria(req.query.id);

        return res.redirect('/kategoria');
            

    });
}
