const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../middleware/auth').jwtSecret;
const auth = require('../middleware/auth');
const express = require("express");
const db = require('../modell/db');
const router = express.Router();
////////////////
// userek
//////////////

/**
 * header-höz automatikusan hozzáadja az uj hivatkozást.
 * Kulcs az ejs fájlban az oldalváltozó neve.
 * Listában első az elérési út a rout-ban a második a megjelenítési neve.
 *
 * */
router.use(auth.auth, (req, res, next) => {
    res.locals.header = {
        "index": "Főoldal",
        "konyv": "Könyv",
        "fiok": "Fiók",
        "szerzo": "Szerzők",
        "kiado": "Kiadók",
        "kategoria": "Kategoriák",
        "nyitvatartas": "Nyitvatartás",
        "bolt": "Bolt",
        "login": "Bejelentkezés",
        "regist": "Regisztráció",
        "logout": "Kilépés",
    };

    res.locals.guest_only = [
        "login", "regist"
    ];
    res.locals.user_only = [
        "logout"
    ];
    res.locals.admin_only = [
        //"fiok", "nyitvatartas"
    ];

    res.locals.oldal = req.path.replace('/', '')
    res.locals.curr_email = req.body.curr_email;
    next()
});

router.get("/", async (req, res) => {
    return res.redirect('index');
});

router.get("/index", async (req, res) => {
    const table = await db.getKonyv();
    const kepek = await db.getKep();
        return res.render('index', {
        table,
        kepek
    });
});

router.get("/szerzo", async (req, res) => {
    const table = await db.getSzerzok();

    return res.render('show_table.ejs', {
        cim: "Szerzők:"
        , table
    });
});
router.get("/kiado", async (req, res) => {
    const table = await db.getKiadok();

    return res.render('show_table.ejs', {
        cim: "Kiadók"
        , table
    });
});

router.get("/fiok", async (req, res) => {
    const table = await db.getFiok();

    return res.render('show_table.ejs', {
        cim: "Fiókok:"
        , table
    });
});
router.get("/kategoria", async (req, res) => {
    const table = await db.getKategoria();

    return res.render('show_table.ejs', {
        cim: "Kategóriák:"
        , table
    });
});

router.get("/konyv", async (req, res) => {
    const table = await db.getKonyv();

    return res.render('show_table.ejs', {
        cim: "Konyv:"
        , table
    });
});

router.get("/nyitvatartas", auth.restrict, async (req, res) => {
    const table = await db.getNyitvatartas();

    return res.render('show_table.ejs', {
        cim: "Nyitvatartas:"
        , table
    });
});

router.get("/bolt", async (req, res) => {
    const table = await db.getBolt();

    return res.render('show_table.ejs', {
        cim: "Bolt:"
        , table
    });
});

router.get("/regist", async (req, res) => {

    return res.render('regist.ejs', {
        cim: "Regisztracio:"
    });
});

router.post("/regist", async (req, res) => {
    let { email_cim, knev, vnev, jelszo, jelszo2 } = req.body;
    if (!email_cim || !knev || !vnev || !jelszo || !jelszo2) {
        return res.render('regist', {
            hiba: "Hiányzó adatok!"
        });
    }

    const user = await db.getFiokByEmail(email_cim);
    if (user && user['rows'].length) {
        return res.render('regist', {
            email_cim,
            hiba: "Iilyen email-cím már szerepel az adatbázisban!"
        });
    }

    if (jelszo !== jelszo2) {
        return res.render('regist', {
            email_cim: email_cim,
            hiba: "A két jelszó nem egyezik!"
        });
    }

    await bcrypt.hash(jelszo, 10).then(function(hash){
        db.addUser(email_cim, hash, knev, vnev);
    });
    return res.redirect('index');
});

router.get("/proba", async (req, res) => {

    const user = await db.getFiokByEmail("a");

    console.log(user['rows'][0][2]);
    return res.send("");
});

router.get("/login", async (req, res) => {
    return res.render('login.ejs');
});

router.post("/login", async (req, res) => {
    let { email_cim, jelszo } = req.body;
    if (!email_cim || !jelszo) {
        return res.render('login', {
            email_cim,
            hiba: ["Kérem mindem mezőt töltsön ki!"]
        });
    }
    const user = await db.getFiokByEmail(email_cim);
    if (!user || !user['rows'].length) {
        return res.render('login', {
            email_cim,
            hiba: ["Hibás felhasználónév vagy jelszó!"]
        });
    }

    const match = await bcrypt.compare(jelszo, user['rows'][0][2]);
    if (match) {
        const token = jwt.sign({
            email: user['rows'][0][1],
        },
            secret
        );

        res.cookie("jwt", token, {
            httpOnly: true
        });
    } else {
        return res.render('login', {
            email: email_cim,
            hiba: ["Hibás felhasználónév vagy jelszó!"]
        });
    }
    return res.redirect('index');
});

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", {
        maxAge: "1"
    })
    return res.redirect("/")
});

router.post("/uploadImg", async (req, res) => {
    const {name, data} = req.files.pic
    if(name && data) {
        await db.uploadImage({name:name, img:data});
        res.sendStatus(200);
    }else{
        console.log("missing data!")
    }
    
});

router.post("/uploadKonyv", async (req, res) => {
    let {isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev} = req.body
    if(isbn && kiado_id && kategoria_id && oldalszam && ar && mikor && nev) {
        await db.uploadKonyv(isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev)
    }else {
        console.log("missing data");
    }

})
/*

router.get("/register", async (req, res) => {
    //const {curr_role} = req.body;
    //if(curr_role !== 'ADMIN')
        //return res.redirect('/raktar');
    //const raktar = await db.getAllRaktar(); 

    return res.render('regist', {
    });
});
router.get("/profile", auth, async (req, res) => {
    const {curr_email, curr_role} = req.body;
    const user = await db.getUserByEmail(curr_email);
    let raktar;
    if(user.raktar_id)
        raktar = await db.getRaktarNameById(user.raktar_id);
    return res.render('profile',{
        curr_role: curr_role,
        raktar_nev: raktar,
        user:user
    });
});

router.get("/changePassword", auth, async (req, res) => {
    let {curr_role} = req.body

    return res.render('changePassword', {
        curr_role: curr_role,
        hiba: ""
    });
});

router.post("/changePassword", auth, async (req, res) => {
   let {jelszo, jelszo2, curr_role, curr_email} = req.body; 

    if(!jelszo && !jelszo2)
        return res.redirect('/changePassword');

    if(jelszo !== jelszo2)
        return res.render('changePassword', {
            curr_role: curr_role,
            hiba: "A két jelszó nem egyezik!"
        });
    else
        await bcrypt.hash(jelszo, 10).then(async(hash) => {
            await db.updatePassword(curr_email, hash);
        });
    return res.redirect('profile');

});

router.get("/users", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    const raktar_user = await db.getAllRaktarUser(); 
    const free_user = await db.getAllFreeUser(); 
    let szerkeszt = req.query.szerkeszt;
    let felhasznalo_id = req.query.id;
    let raktar;
    if(felhasznalo_id){
        raktar = await db.getAllRaktar(); 
    }


    return res.render('userek', {
        felhasznalo_id: felhasznalo_id,
        raktar_user: raktar_user,
        free_user: free_user,
        raktar: raktar,
        szerkeszt: szerkeszt,
        curr_role: req.body.curr_role,
        curr_email: req.body.curr_email
    });
});

router.post("/editUser", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    let {felhasznalo_id, nev, email, role, selected_raktar} = req.body;
    if(felhasznalo_id, nev, email, role, selected_raktar){
        await db.editUser(felhasznalo_id, nev, email, role, selected_raktar);
    }
    return res.redirect('/users?szerkeszt=1');

});

router.post("/deleteUser", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    let {id} = req.body;
    await db.deleteUser(id);
  
    return res.redirect('users?szerkeszt=1');
});

///////////
// raktar
//////////

router.get("/raktar", auth, async (req, res) => {
    const {curr_email, curr_role} = req.body;

    const raktar = await db.getAllRaktar(); 
    let szerkeszt = req.query.szerkeszt;
    let id = req.query.id;
    let user;
    if(curr_role !== 'ADMIN'){
        user = await db.getUserByEmail(curr_email);
        szerkeszt = id = "";
    }

    return res.render('raktar', {
        user: user,
        curr_role: curr_role,
        id: id,
        raktar: raktar,
        szerkeszt: szerkeszt
    });
});

router.post("/raktar", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    let {varos, utca, kapacitas} = req.body;
    let hiba;
    if(!varos || !utca || !kapacitas){
        hiba = "Kérem minden mezőt töltsön ki!";
    }else if(isNaN(kapacitas)){
        hiba = "A kapacitas csak szám lehet!";
    }
    if(hiba){
        const raktar = await db.getAllRaktar(); 
        return res.render('raktar' ,{
            hiba:hiba,
            raktar: raktar
        });
    }
    await db.addRaktar(varos, utca, kapacitas);
  
    return res.redirect('/raktar');
});

router.post("/editRaktar", auth, async (req, res) => {
    const {curr_role, curr_email} = req.body;
    if(curr_role !== 'ADMIN' )
        return res.redirect('/raktar');
    let {id, varos, utca, kapacitas} = req.body;
    if(varos && utca && kapacitas){
        await db.editRaktar(id, varos, utca, kapacitas);
    }
    return res.redirect('/raktar?szerkeszt=1');

});

router.post("/deleteRaktar", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    let {id} = req.body;
    await db.deleteRaktar(id);
  
    return res.redirect('raktar?szerkeszt=1');
});

router.get("/viewRaktar", auth, async (req, res) => {
    const {curr_role, curr_email} = req.body;
    const user = await db.getUserByEmail(curr_email);
    let raktar_id = req.query.id;
    let sajat = raktar_id == user.raktar_id ? 1:0;
    let aru_id = req.query.aru_id;
    let szerkeszt = req.query.szerkeszt;
    const nev = await db.getRaktarNameById(raktar_id);
    const aruk = await db.getAllAruByRaktarId(raktar_id);
    const all_aru = await db.getAllAru(raktar_id);
    return res.render('viewRaktar',{
        sajat: sajat,
        curr_role: curr_role,
        szerkeszt: szerkeszt,
        raktar_id: raktar_id,
        aru_id: aru_id,
        nev: nev,
        aruk: aruk,
        all_aru: all_aru
    });
});

router.get("/sajatRaktar", auth, async (req, res) => {
    const {curr_role, curr_email} = req.body;
    const user = await db.getUserByEmail(curr_email);
    res.redirect(`viewRaktar?id=${user.raktar_id}`);
});

router.post("/addToKeszlet", auth, async (req, res) => {
    let {raktar_id, aru_id, mennyiseg, curr_role, curr_email} = req.body;

    const user = await db.getUserByEmail(curr_email);
    console.log(raktar_id, aru_id, mennyiseg, curr_role, curr_email);

    if(curr_role !== 'ADMIN' && raktar_id != user.raktar_id){
        return res.redirect(`viewRaktar?id=${raktar_id}`);
    }

    if(isNaN(mennyiseg) || mennyiseg <= 0){
        if(req.headers.referer.split('/')[3] === 'sajatRaktar')
            return res.redirect(`sajatRaktar`);
        return res.redirect(`viewRaktar?id=${raktar_id}`);
    }

    await db.addToKeszlet(raktar_id, aru_id,mennyiseg);
    if(req.headers.referer.split('/')[3] === 'sajatRaktar')
        return res.redirect(`sajatRaktar`);

    return res.redirect(`viewRaktar?id=${raktar_id}`);
});

router.post("/editKeszlet", auth, async (req, res) => {
    let {raktar_id, aru_id, mennyiseg, curr_email, curr_role} = req.body; 

    const user = await db.getUserByEmail(curr_email);

    if(curr_role !== 'ADMIN' && raktar_id != user.raktar_id){
        return res.redirect(`viewRaktar?id=${raktar_id}`);
    }

    if(isNaN(mennyiseg))
    return res.redirect(`viewRaktar?id=${raktar_id}&szerkeszt=1`);


    await db.editKeszlet(raktar_id, aru_id, mennyiseg);

    return res.redirect(`viewRaktar?id=${raktar_id}&szerkeszt=1`);
});

router.post("/deleteFromKeszlet", auth, async (req, res) => {
    let {aru_id, raktar_id, curr_email, curr_role} = req.body;
    const user = await db.getUserByEmail(curr_email);
    if(curr_role !== 'ADMIN' && raktar_id != user.raktar_id){
        return res.redirect(`viewRaktar?id=${raktar_id}`);
    }

    await db.deleteFromKeszlet(aru_id);

    return res.redirect(`viewRaktar?id=${raktar_id}&szerkeszt=1`);
});

////////////////
// aruk
///////////////

router.get("/aruk", auth, async (req, res) => {
    const {curr_role} = req.body;
    if(curr_role !== 'ADMIN')
        return res.redirect('/raktar');
    const aruk = await db.getAllAru();
    let szerkeszt = req.query.szerkeszt;
    let id = req.query.id;

    return res.render('aruk',{
        curr_role: curr_role,
        aruk: aruk,
        id: id,
        szerkeszt: szerkeszt
    });

});

router.post("/addAru", auth, async (req, res) => {
    let {nev, terfogat, suly, ar} = req.body; 
    if(isNaN(terfogat) || isNaN(suly) || isNaN(ar)){
        return res.redirect('/aruk');
    }
    await db.addAru(nev, terfogat, suly, ar);

    return res.redirect('/aruk');

});

router.post("/editAru", auth, async (req, res) => {
    let {aru_id, nev, terfogat, suly, ar} = req.body; 
    await db.editAru(aru_id, nev, terfogat, suly, ar);
    return res.redirect('/aruk?szerkeszt=1');

});

router.post("/deleteAru", auth, async (req, res) => {
    let {aru_id} = req.body;
    await db.deleteAru(aru_id);
    return res.redirect('aruk?szerkeszt=1');
});

router.get("/szallitmany", auth, async (req, res) => {
    let {curr_role, curr_email} = req.body;
    let raktar; 
    let szallitmany;
    const user = await db.getUserByEmail(curr_email);
    if(curr_role === 'ADMIN'){
        raktar = await db.getAllRaktar();
        szallitmany = await db.getAllSzallitmany();
    }else{
        szallitmany = await db.getAllSzallitmanyByRaktarId(user.raktar_id);
    }

    let szerkeszt = req.query.szerkeszt;
    let id = req.query.id;

    return res.render('szallitmany',{
        honnan_id: user.raktar_id,
        curr_role: curr_role,
        raktar: raktar,
        szallitmany: szallitmany,
        id: id,
        szerkeszt: szerkeszt
    });

});

router.get("/ujSzallitmany", auth, async (req, res) => {
    let {curr_role, curr_email} = req.body;
    let {honnan_id} = req.query;
    let {rakomany} = req.cookies;

    if(!honnan_id)
        return res.redirect('/szallitmany');

    const raktar = await db.getAllRaktar();
    const aruk = await db.getAllAruByRaktarId(honnan_id);
    const honnan = await db.getRaktarNameById(honnan_id);

    let rakomany_aru;

    if(rakomany && Object.keys(rakomany).length > 0){
        rakomany_aru = await db.getAllAruByIdArr(Object.keys(rakomany).join(', '));
        for(let i = 0; i < rakomany_aru.length; i++){
            rakomany_aru[i]['mennyiseg'] = rakomany[rakomany_aru[i]['aru_id']];

        }
    
    
        for(let i = 0; i < aruk.length; i++){
            for(let j of Object.keys(rakomany)){
                if(aruk[i].aru_id == j){
                    aruk[i]['mennyiseg'] -= rakomany[aruk[i]['aru_id']];
                }
            }
        }
    }
    return res.render('ujSzallitmany', {
        honnan: honnan,
        honnan_id: honnan_id,
        rakomany: rakomany_aru,
        curr_role: curr_role, 
        raktar: raktar,
        aruk: aruk

    });

});

//const editKeszlet = async (raktar_id, aru_id, mennyiseg) => {

router.post("/ujSzallitmany", auth, async (req, res) => {
    let {curr_role, curr_email, honnan_id, hova_id} = req.body;
    let {rakomany} = req.cookies;

    let time = new Date().toLocaleString('hu', {timeZone: 'Europe/Athens'}).replace('. ','-').replace('. ','-').replace('. ',' ');
    await db.addSzallitmany(time, curr_email, honnan_id, hova_id);
    const szallitmany_id = (await db.getAllSzallitmanyIdByDate(time)).szallitmany_id;
    for(i of Object.keys(rakomany)){
        let mennyiseg = await db.getAruMennyisegByRaktarIdAruId(honnan_id, i);
        await db.editKeszlet(honnan_id, i, mennyiseg-rakomany[i]);

        let mennyiseg2 = await db.getAruMennyisegByRaktarIdAruId(hova_id, i);
        if(mennyiseg2 > 0)
            await db.editKeszlet(hova_id, i, mennyiseg2+rakomany[i]);
        else
            await db.addToKeszlet(hova_id, i, rakomany[i]);
        
        await db.addToRakomany(szallitmany_id, i, rakomany[i]);
    }
    res.cookie("rakomany", '', {
        httpOnly: true
    });
    return res.redirect('szallitmany');
});

router.post("/editSzallitmany", auth, async (req, res) => {
    let {szallitmany_id, honnan_id, hova_id} = req.body;
    await db.editSzallitmany(szallitmany_id, honnan_id, hova_id);
    
    res.redirect('/szallitmany?szerkeszt=1');

});

router.post("/deleteSzallitmany", auth, async (req, res) => {
    let {del_id} = req.body;

    await db.deleteSzallitmany(del_id);
    
    res.redirect('/szallitmany?szerkeszt=1');
});

router.post("/addToRakomany", auth, async (req, res) => {
    let {honnan_id, aru_id, mennyiseg} = req.body;
    let {rakomany} = req.cookies;
    
    if(!rakomany)
        rakomany = {};
    if(rakomany[aru_id] == null){
        rakomany[aru_id] = 1;
    }else
        rakomany[aru_id] = +mennyiseg+rakomany[aru_id];

    res.cookie("rakomany", rakomany, {
        httpOnly: true
    });
    return res.redirect(`/ujSzallitmany?honnan_id=${honnan_id}`);

});

router.post("/editRakomany", auth, async (req, res) => {
    let {honnan_id, aru_id, mennyiseg} = req.body;
    let {rakomany} = req.cookies;
    rakomany[aru_id] = +mennyiseg;

    res.cookie("rakomany", rakomany, {
        httpOnly: true
    });
    return res.redirect(`/ujSzallitmany?honnan_id=${honnan_id}`);

});

router.post("/editRakomanyUtolag", auth, async (req, res) => {
    let {szallitmany_id, aru_id, mennyiseg} = req.body;

    await db.editRakomany(szallitmany_id, aru_id, mennyiseg);

    return res.redirect(`/viewRakomany?id=${szallitmany_id}&szerkeszt=1`);
});

router.post("/addToRakomanyUtolag", auth, async (req, res) => {
    let {szallitmany_id, aru_id} = req.body;

    let jelenlegi = await db.getAruMennyisegBySzallitmanyIdAruId(szallitmany_id, aru_id);
    console.log(jelenlegi);


    if(jelenlegi.length == 0)
        await db.addToRakomany(szallitmany_id, aru_id, 1);
    else
        await db.editRakomany(szallitmany_id, aru_id, jelenlegi[0].mennyiseg+1);

    return res.redirect(`/viewRakomany?id=${szallitmany_id}&szerkeszt=1`);
});

router.get("/torolFromRakomany", auth, async (req, res) => {
    let {honnan_id, aru_id} = req.query;
    let {rakomany} = req.cookies;
    delete rakomany[aru_id];

    res.cookie("rakomany", rakomany, {
        httpOnly: true
    });
    return res.redirect(`/ujSzallitmany?honnan_id=${honnan_id}&szerkeszt=1`);

});

router.get("/torolFromRakomanyUtolag", auth, async (req, res) => {
    let {szallitmany_id, aru_id} = req.query;

    await db.deleteFromRakomany(szallitmany_id, aru_id);


    return res.redirect(`/viewRakomany?id=${szallitmany_id}&szerkeszt=1`);

});

router.get("/viewRakomany", auth, async (req, res) => {
    let {curr_role} = req.body;
    let {id, szerkeszt} = req.query;
    console.log(id);

    const aruk = await db.getAllAru();
    const rakomany = await db.getRakomanyBySzallitmanyId(id);

    return res.render('viewRakomany',{
        szallitmany_id: id,
        szerkeszt: szerkeszt,
        curr_role: curr_role,
        rakomany: rakomany,
        aruk: aruk
    });

});

router.get('/statok', auth, async (req, res) => {
    let {curr_role} = req.body;

    const stat1 = await db.stat1();
    const stat2 = await db.stat2();

    res.render('statok', {
        curr_role: curr_role,
        stat1: stat1,
        stat2: stat2
    });

});
*/
module.exports = router;
