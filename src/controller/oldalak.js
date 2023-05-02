const { restrict_only_guest, restrict_only_logged_in, restrict_only_admin, restrict_only_user} = require('../middleware/auth');
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
        //const bevetel = await db.szerzo_bevetel('King', 'Stephen');
        //const datum = await db.szallitasi_datum();
        //const konyvek = await db.ujjanon_konyvek(1000);
        //const konyvek = await db.nepszeru_konyvek(2);
        const table = (await db.getKonyv()).rows;
        const bestSeller10 = (await db.nepszeru_konyvek(10)).rows[0][0];

        return res.render('index', {
            table,
            bestSeller10
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

    app.get("/fiok", restrict_only_admin, async (req, res) => {
        const table = await db.getFiok();

        return res.render('show_table.ejs', {
            cim: "Fiókok:"
            , table
        });
    });

    app.get("/statisztika", restrict_only_admin, async (req, res) => {
        const bestSzerzo = await db.bestSzerzo();
        const bestKategoria = await db.bestKategoria();
        const bestKiado = await db.bestKiado();
        const bestUserek = await db.bestUserek();
        const utoloDarabok = await db.utoloDarabok();
        const elfogyott = await db.elfogyott();
        const bestKategoriabestSeller = await db.bestKategoriabestSeller();

        return res.render('stats.ejs', {
            cim: "Statisztika:",
            bestSzerzo,
            bestKategoria,
            bestKiado,
            bestUserek,
            utoloDarabok,
            elfogyott,
            bestKategoriabestSeller
        });
    });
    
    app.get("/kosar", restrict_only_user, async (req, res) => {
        if (req.cookies.isbn) {
            const jsonStr = req.cookies.isbn;
            if (jsonStr['expires'] > 0) {
                return res.render('kosar.ejs');
            }
            const array = JSON.parse(jsonStr);
            let konyvek = []
            const dbs = []

            for (let i = 0; i < array.length; i++) {
                const konyv = (await db.getKonyvByISBN(array[i].isbn)).rows[0]
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

    app.get("/rendeles", restrict_only_user, async (req, res) => {
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        const konyvek = []
        const dbs = []
        let konyvosszeg = 0

        for (let i = 0; i < array.length; i++) {
            const konyv = (await db.getKonyvByISBN(array[i].isbn)).rows[0]
            dbs.push(array[i].darab)
            konyvek.push(konyv)
            konyvosszeg += array[i].darab * konyv[4]
        }

        return res.render('rendeles.ejs', {
            konyvek,
            darabszam: dbs,
            konyvosszeg
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

    app.get("/konyv", restrict_only_admin, async (req, res) => {
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


    app.post("/addToKosar", restrict_only_user, async (req, res) => {
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
                        array[i].darab += 1;
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

    app.post("/item", async (req, res) => {
        let { mennyi, isbn } = req.query;
        const jsonStr = req.cookies.isbn;
        let array = JSON.parse(jsonStr);

        for (let i = 0; i < array.length; i++) {
            if (isbn === array[i].isbn) {
                array[i].darab += mennyi * 1;

                if(array[i].darab === 0){
                    array = array.filter(item => item !== array[i])
                }

                break;
            }
        }
        const updatedJsonStr = JSON.stringify(array);
        res.cookie('isbn', updatedJsonStr);

        return res.redirect('/kosar');
    });

    app.post("/deleteItem", async (req, res) => {
        let { isbn } = req.query;
        const jsonStr = req.cookies.isbn;
        let array = JSON.parse(jsonStr);

        array = array.filter(item => item.isbn !== isbn)

        const updatedJsonStr = JSON.stringify(array);
        res.cookie('isbn', updatedJsonStr);

        return res.redirect('/kosar');
    });

    app.post('/rendel', restrict_only_user, async (req, res) => {
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        let user = (await db.getFiokByEmail(req.body.curr_email)).rows[0];

        for(let i of array) {
            let konyv = (await db.getKonyvByISBN(i.isbn)).rows[0];
            await db.setRendeles(i.isbn, user[0], konyv[4], i.darab);
        }

        res.cookie('isbn', { expires: Date.now() });
        res.redirect('index');
    });

}
