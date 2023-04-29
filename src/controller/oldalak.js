const restrict = require('../middleware/auth').restrict;
const oldalak = require('../middleware/oldalak').oldalak;
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
    });

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
    });

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
        //res.cookies.set('isbn',{maxAge:0});
        console.log(res)
        //res.redirect('index');
        //res.end()
        //add to rendelesek
        
    });

}
