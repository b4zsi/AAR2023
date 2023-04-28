const restrict = require('../middleware/auth').restrict;
const db = require('../modell/db');
const jwt = require('jsonwebtoken')

module.exports = function(app) {

    app.get("/", async (req, res) => {
        return res.redirect('index');
    });

    app.get("/index", async (req, res) => {
        const table = await db.getKonyv();
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
    app.get("/fiok", restrict, async(req, res) => {
        const rendelesek = 0
        return res.render('rendeleseim.ejs', {
            rendelesek
        })
    });
    app.get("/kosar", async (req, res) => {
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        const konyvek = []
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
    });

    app.get("/rendeles", async(req,res) =>{
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        const konyvek = []
        const dbs = []

        for(let i = 0;i < array.length;i++) {
            const konyv = await db.getKonyByISBN(array[i].isbn)
            dbs.push(array[i].darab)
            konyvek.push(konyv)
        }

        return res.render('rendeles.ejs',{
            konyvek,
            darabszam:dbs
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

    app.get("/upload", async (req, res) => {
        let { nev } = req.body
        return res.render("upload", {
            nev
        });
    })
    app.get("/deleteKonyv", async (req, res) => {
        let {id} = req.body
        //return await db.deleteKonyv()
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
    app.post("/addToKosar", async (req, res)=>{
        let {isbn} = req.body;
            if(!req.cookies.isbn) {
            const obj = [{isbn: isbn, darab:1}]
            const jsonStr = JSON.stringify(obj);
            res.cookie('isbn', jsonStr, {maxAge:86400000})
            }
            else {
                let van = false
                const jsonStr = req.cookies.isbn;
                const array = JSON.parse(jsonStr);

                for(let i = 0;i < array.length;i++){
                    if(isbn === array[i].isbn) {
                        array[i].darab += 1*1;
                        van = true;
                    }
                }
                if(van){
                    const updatedJsonStr = JSON.stringify(array);
                    res.cookie('isbn', updatedJsonStr);
                }else {
                    const obj = {isbn: isbn, darab:1}
                    array.push(obj)
                    const updatedJsonStr = JSON.stringify(array);
                    res.cookie('isbn', updatedJsonStr);
                }
                
            }
        return res.redirect('index');
    })

    app.get("/item", async (req, res)=>{
        let { mennyi, isbn } = req.query;
        const jsonStr = req.cookies.isbn;
        const array = JSON.parse(jsonStr);
        
        for(let i = 0;i < array.length;i++){
            if(isbn === array[i].isbn) {
                array[i].darab += mennyi*1;
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
            await db.setRendeles(i.isbn,user['rows'][0][0],konyv['rows'][0][3]);
        }
        res.cookie('isbn', {expires: Date.now()});
        res.redirect('index');
        
    });

}
