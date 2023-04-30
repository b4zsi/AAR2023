const restrict = require('../middleware/auth').restrict;
const oldalak = require('../middleware/oldalak').oldalak;
const db = require('../modell/db');
const jwt = require('jsonwebtoken')

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

        for(let i of konyvek.rows){
            console.log(i);
        }
        return res.render('index', {
            table,
        });
    });

    app.get("/szerzo", async (req, res) => {
        const table = await db.getSzerzok();

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
    
    app.get("/kosar", async (req, res) => {
        if(req.cookies.isbn) {
            const jsonStr = req.cookies.isbn;
            if(jsonStr['expires'] > 0){
                return res.render('kosar.ejs');
            }
            const array = JSON.parse(jsonStr);
                var konyvek = []
                const dbs = []
            
            for(let i = 0;i < array.length;i++) {
                const konyv = await db.getKonyByISBN(array[i].isbn)
                dbs.push(array[i].darab)
                konyvek.push(konyv)
            }
            return res.render('kosar.ejs',{
                konyvek,
                darabszam:dbs
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
            const konyv = await db.getKonyByISBN(array[i].isbn)
            dbs.push(array[i].darab)
            konyvek.push(konyv)
        }

        return res.render('rendeles.ejs', {
            konyvek,
            darabszam: dbs
        })

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
        let { id } = req.query
        let kiado, kategoria;
        let szerkesztendo;

        if (req.body.curr_role === 1) {
            if (id) {
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
        let { nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar } = req.body;

        await db.editKonyv(nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar);

        return res.redirect('/konyv?id=' + isbn);
    });

    app.get("/deleteKonyv", async (req, res) => {
        let { id } = req.query

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

    app.get(["/upload", "/uploadKonyv"], restrict, oldalak, async (req, res) => {
        const kiado = await db.getKiado();
        const kategoria = await db.getKategoria();

        return res.render("uploadKonyv", {
            kiado,
            kategoria,
        });
    });

    app.post("/uploadKonyv", async (req, res) => {
        let { nev, isbn, kiado, kategoria, oldalszam, mikor, ar } = req.body;

        await db.uploadKonyv(nev, isbn, kiado, kategoria, oldalszam, mikor, ar);

        return res.redirect("upload");
    });

    app.get("/uploadSzerzo", oldalak, async (req, res) => {

        return res.render("uploadSzerzo");
    });

    app.post("/uploadSzerzo", async (req, res) => {
        let { vezetek, kereszt } = req.body;

        await db.uploadSzerzo(vezetek, kereszt);

        return res.redirect("uploadSzerzo");
    });


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

    app.post("/addToKosar", async (req, res)=> {
        let {isbn} = req.body;

        if(!req.cookies.isbn) {
            const obj = [{isbn: isbn, darab:1}]
            const jsonStr = JSON.stringify(obj);
            res.cookie('isbn', jsonStr, {maxAge:86400000})
        }else {
            const jsonStr = req.cookies.isbn;

            if(jsonStr['expires'] > 0) {
                const array = []
                const obj = {isbn: isbn, darab:1}
                array.push(obj)
                const updatedJsonStr = JSON.stringify(array);
                res.cookie('isbn', updatedJsonStr);
            }else {
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
    app.get('/rendel', async (req,res)=>{
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        let user = await db.getFiokByEmail(req.body.curr_email);
        for(let i of array) {
            let konyv = await db.getKonyByISBN(i.isbn);
            await db.setRendeles(i.isbn,user['rows'][0][0],konyv['rows'][0][3], i.darab);
        }
        res.cookie('isbn', {expires: Date.now()});
        res.redirect('index');
    });

}
