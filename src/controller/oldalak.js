const restrict = require('../middleware/auth').restrict;
const oldalak = require('../middleware/oldalak').oldalak;
const db = require('../modell/db');

module.exports = function(app) {

    app.get("/", async (req, res) => {
        return res.redirect('index');
    });

    app.get("/index", async (req, res) => {
        const table = await db.getKonyv();
        return res.render('index', {
            table,
        });
        return res.render('index');
    });

    app.get("/szerzo", async (req, res) => {
        const table = await db.getSzerzo();

        return res.render('show_table.ejs', {
            cim: "Szerzők:"
            , table
        });
    });
    app.get("/kiado", async (req, res) => {
        const table = await db.getKiado();

        return res.render('show_table.ejs', {
            cim: "Kiadók"
            , table
        });
    });

    app.get("/fiok", restrict, async (req, res) => {
        const table = await db.getFiok();

        return res.render('show_table.ejs', {
            cim: "Fiókok:"
            , table
        });
    });
    app.get("/kategoria", async (req, res) => {
        const table = await db.getKategoria();

        return res.render('show_table.ejs', {
            cim: "Kategóriák:"
            , table
        });
    });

    app.get("/konyv", async (req, res) => {
        const table = await db.getKonyv();
        let { id }= req.query
        let kiado, kategoria;
        let szerkesztendo;

        if(req.body.curr_role === 1){
            if(id){
                szerkesztendo = await db.getKonyvById(id);
            }
            kiado = await db.getKiado();
            kategoria = await db.getKategoria();
        }


        return res.render('konyv.ejs', {
            kiado,
            szerkesztendo,
            kategoria,
            table,
            id,
        });
    });

    app.post("/editKonyv", async (req, res) => {
        let {nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar} = req.body;

        await db.editKonyv(nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar);

        return res.redirect('/konyv?id=' + isbn);
    });

    app.get("/deleteKonyv", async (req, res) => {
        let { id }= req.query

        await db.deleteKonyv(id);

        return res.redirect('/konyv');
    });

    app.get("/nyitvatartas", async (req, res) => {
        const table = await db.getNyitvatartas();

        return res.render('show_table.ejs', {
            cim: "Nyitvatartas:"
            , table
        });
    });

    app.get("/bolt", async (req, res) => {
        const table = await db.getBolt();

        return res.render('show_table.ejs', {
            cim: "Bolt:"
            , table
        });
    });


    app.get(["/upload", "/uploadKonyv"],restrict, oldalak, async (req, res) => {
        const kiado = await db.getKiado();
        const kategoria = await db.getKategoria();
                                      
        return res.render("uploadKonyv",{
            kiado,
            kategoria,
        });
    });

    app.post("/uploadKonyv", async (req, res) => {
        let {nev, isbn, kiado, kategoria, oldalszam, mikor, ar} = req.body;

        await db.uploadKonyv(nev, isbn, kiado, kategoria, oldalszam, mikor, ar);
                                      
        return res.redirect("upload");
    });

    app.get("/uploadSzerzo", oldalak, async (req, res) => {
                                      
        return res.render("uploadSzerzo");
    });

    app.post("/uploadSzerzo", async (req, res) => {
        let {vezetek, kereszt} = req.body;

        await db.uploadSzerzo(vezetek, kereszt);
                                      
        return res.redirect("uploadSzerzo");
    });

    app.get("/deleteKonyv", (req, res) => {

    })

    app.post("/uploadImg", async (req, res) => {
        const { name, data } = req.files.pic
        if (name && data) {
            await db.uploadImage({ name: name, img: data });
            res.sendStatus(200);
        } else {
            console.log("missing data!")
        }

    });

    app.post("/uploadKonyv", async (req, res) => {
        let { isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev } = req.body
        if (isbn && kiado_id && kategoria_id && oldalszam && ar && nev) {
            await db.uploadKonyv(isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev)
            return res.redirect('index');
        } else {
            console.log("missing data");
        }

    })

}
