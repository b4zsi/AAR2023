const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');
const common = require('../modell/common');
const konyv_db = require('../modell/konyv');
const jwt = require('jsonwebtoken')
const path = require("path");
const fs = require("fs");


module.exports = function(app) {

    app.get("/", async (req, res) => {
        return res.redirect('index');
    });

    app.get("/index", async (req, res) => {
        //const konyvek = await db.konyvszam_szerzo_szerint('King', 'Stephen');
        const bevetel = await db.szerzo_bevetel('King', 'Stephen');
        const datum = await db.szallitasi_datum();
        //const konyvek = await db.ujjanon_konyvek(1000);
        const konyvek = await db.nepszeru_konyvek(2);
        const table = await db.getKonyv();

        return res.render('index', {
            table,
        });
    });

    app.get("/szerzo", async (req, res) => {
        const table = await db.getSzerzo();
        let { id } = req.query
        let szerkesztendo;

        if(id){
            szerkesztendo = await common.getSzerzoById(id);
        }

        return res.render('szerzo', {
            table,
            id,
            szerkesztendo,
        });
    });

    app.get("/kiado", async (req, res) => {
        const table = await common.getAllKiado();

        let { id } = req.query
        let szerkesztendo;

        if(id){
            szerkesztendo = await common.getKiadoById(id);
        }


        return res.render('kiado', {
            table,
            id,
            szerkesztendo,
        });
    });

    app.get("/fiok", restrict, async (req, res) => {
        const table = await db.getFiok();

        return res.render('show_table.ejs', {
            cim: "Fiókok:"
            , table
        });
    });

    app.get("/kosar", async (req, res) => {
        if (req.cookies.isbn) {
            const jsonStr = req.cookies.isbn;
            if (jsonStr['expires'] > 0) {
                return res.render('kosar.ejs');
            }
            const array = JSON.parse(jsonStr);
            var konyvek = []
            const dbs = []

            for (let i = 0; i < array.length; i++) {
                const konyv = await db.getKonyvByISBN(array[i].isbn)
                dbs.push(array[i].darab)
                konyvek.push(konyv)
            }
            return res.render('kosar.ejs', {
                konyvek,
                darabszam: dbs
            });
        }
        return res.render('kosar.ejs');
    });

    app.get("/rendeles", async (req, res) => {
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        const konyvek = []
        const dbs = []

        for (let i = 0; i < array.length; i++) {
            const konyv = await db.getKonyvByISBN(array[i].isbn)
            dbs.push(array[i].darab)
            konyvek.push(konyv)
        }

        return res.render('rendeles.ejs', {
            konyvek,
            darabszam: dbs
        })

    });

    app.get("/kategoria", async (req, res) => {
        const table = await common.getAllKategoria();

        let { id } = req.query
        let szerkesztendo;

        if(id){
            szerkesztendo = await common.getKategoriaById(id);
        }


        return res.render('kategoria', {
            table,
            id,
            szerkesztendo,
        });

    });

    app.get("/konyv", async (req, res) => {
        const table = await konyv_db.getKonyv();
        let { id } = req.query

        let kiado, kategoria;
        let szerkesztendo;

        if (req.body.curr_role === 1) {
            if (id) {
                szerkesztendo = await konyv_db.getKonyvByISBN(id);
            }
            kiado = await common.getAllKiado();
            kategoria = await common.getAllKategoria();
        }

        return res.render('konyv.ejs', {
            kiado,
            szerkesztendo,
            kategoria,
            table,
            id,
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
        const table = await common.getAllBolt();

        return res.render('show_table.ejs', {
            cim: "Bolt:"
            , table
        });
    });


    app.post("/addToKosar", async (req, res) => {
        let { isbn } = req.body;

        if (!req.cookies.isbn) {
            const obj = [{ isbn: isbn, darab: 1 }]
            const jsonStr = JSON.stringify(obj);
            res.cookie('isbn', jsonStr, { maxAge: 86400000 })
        } else {
            const jsonStr = req.cookies.isbn;

            if (jsonStr['expires'] > 0) {
                const array = []
                const obj = { isbn: isbn, darab: 1 }
                array.push(obj)
                const updatedJsonStr = JSON.stringify(array);
                res.cookie('isbn', updatedJsonStr);
            } else {
                let van = false
                const array = JSON.parse(jsonStr);

                for (let i = 0; i < array.length; i++) {
                    if (isbn === array[i].isbn) {
                        array[i].darab += 1 * 1;
                        van = true;
                    }
                }

                const updatedJsonStr = JSON.stringify(array);
                res.cookie('isbn', updatedJsonStr);

                if (!van) {
                    const obj = { isbn, darab: 1 };
                    array.push(obj);
                    const updatedJsonStr = JSON.stringify(array);
                    res.cookie('isbn', updatedJsonStr);
                }
            }
        }

        return res.redirect('index');
    })

    app.get("/item", async (req, res) => {
        let { mennyi, isbn } = req.query;
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);

        for (let i = 0; i < array.length; i++) {
            if (isbn === array[i].isbn) {
                array[i].darab += mennyi * 1;
            }
        }
        const updatedJsonStr = JSON.stringify(array);
        res.cookie('isbn', updatedJsonStr);

        return res.redirect('/kosar');
    });
    app.get('/rendel', async (req, res) => {
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        let user = await db.getFiokByEmail(req.body.curr_email);
        for (let i of array) {
            let konyv = await db.getKonyByISBN(i.isbn);
            await db.setRendeles(i.isbn, user['rows'][0][0], konyv['rows'][0][3], i.darab);
        }
        res.cookie('isbn', { expires: Date.now() });
        res.redirect('index');
    });

}
