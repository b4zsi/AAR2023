const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');

module.exports = function(app) {

    app.get("/", async (req, res) => {
        return res.redirect('index');
    });

    app.get("/index", async (req, res) => {
        return res.render('index');
    });

    app.get("/szerzo", async (req, res) => {
        const table = await db.getSzerzok();

        return res.render('show_table.ejs', {
            cim: "Szerzők:"
            , table
        });
    });
    app.get("/kiado", async (req, res) => {
        const table = await db.getKiadok();

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

        return res.render('show_table.ejs', {
            cim: "Konyv:"
            , table
        });
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
}
