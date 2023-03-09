const express = require("express");
const ArukeszletDAO = require('../dao/arukeszlet-dao');
const EtelDAO = require('../dao/etelek-dao');
const RendelesDAO = require('../dao/rendeles-dao');
const UserDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const router = express.Router();


// #region etelek
router.get("/rendelesek", async(req, res) => {
    const token = req.cookies.jwt
    let current_role;
    let current_email;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
            current_email = decodedToken.email;
        });
    }
    if(current_role === "ROLE_USER"){
        let all = [];
        const user = await UserDAO.getUserByEmail(current_email);
        const rendelesek = await RendelesDAO.getRendelesekByUserId(user.id);
        let arak = [];
        for (let i = 0; i < rendelesek.length; i++){
            arak.push(rendelesek[i].ar);
            all.push(await RendelesDAO.getRendelesEtelekById(rendelesek[i].id));
        }

        return res.render('rendelesek', {
            current_role: current_role,
            rendelesek: all,
            rendeles: null,
            arak: arak
        });
    }else {
        const rendelesek = await RendelesDAO.allRendeles();

        return res.render('rendelesek', {
            current_role: current_role,
            rendelesek: rendelesek,
            rendeles: null
        });
    }
});

router.get("/rendelesek/:id", async(req, res) => {
    const token = req.cookies.jwt
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }

    let id = req.params.id;
    const rendelesek = await RendelesDAO.allRendeles();
    let rendeles = await RendelesDAO.getRendelesEtelekById(id);

    return res.render('rendelesek', {
        current_role: current_role,
        rendelesek: rendelesek,
        rendeles: rendeles,
        id: id
    });
});

router.post("/editRendelesek/:id", async (req, res) => {
    const token = req.cookies.jwt
    let current_role;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }

    let id = req.params.id;
    let hossz = Object.keys(req.body).length/2;
    let ar = 0;

    for (let i = 0; i < hossz; i++){
        let nev = req.body["nev"+i];
        let mennyiseg = req.body["mennyiseg"+i];
        let etel = await EtelDAO.getEtelByNev(nev);
        await RendelesDAO.updateRendelesEtelMennyiseg(id, etel.id, mennyiseg)
        ar += etel.ar * mennyiseg;
    }

    await RendelesDAO.updateRendelesArById(id, ar);

    res.redirect('/rendelesek');
});

router.post("/addEtel", async (req, res) => {
    let {nev} = req.body;
    let {leiras} = req.body;
    let {ar} = req.body;
    let {kepnev} = req.body;
    const token = req.cookies.jwt
    let current_role;
    let {gluten} = req.body;
    let {laktoz} = req.body;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }
    if(current_role === "ROLE_ADMIN"){
        await EtelDAO.addEtel(nev, leiras, kepnev, ar, laktoz, gluten);
    }
    return res.redirect('/menu');
    
});

router.post("/deleteEtel/:id", async (req, res) => {
    const token = req.cookies.jwt
    let current_role;
    let id = req.params.id;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }

    if(current_role === "ROLE_ADMIN"){
        await EtelDAO.deleteEtel(id);
    }
    return res.redirect('/menu');
});

router.get("/menu/:id", async (req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;
    let id = req.params.id;
    
    const etelek = await EtelDAO.getEtelek();
    const etel = await EtelDAO.getEtel(id);
    const mentesseg = await EtelDAO.getErzekenysegByEtelid(id);
    const mentessegek = await EtelDAO.getMentesseg();
    const laktoz = mentesseg.some(e => e.erzekenyseg === 'Laktóz');
    const gluten = mentesseg.some(e => e.erzekenyseg === 'Glutén');
    
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        });
    }

    return res.render('menu', {
        current_email: current_email,
        current_role: current_role,
        etel:etel,
        etelek: etelek,
        laktoz: laktoz,
        gluten: gluten,
        mentessegek: mentessegek
    });
});

router.post("/editEtel/:id", async (req, res) => {
    const token = req.cookies.jwt
    let current_role;
    let id = req.params.id;
    let {nev} = req.body;
    let {leiras} = req.body;
    let {ar} = req.body;
    let {kepnev} = req.body;
    let {gluten} = req.body;
    let {laktoz} = req.body;
    const jelenlegi = await EtelDAO.getEtel(id);

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }

    if(current_role === "ROLE_ADMIN"){
        await EtelDAO.updateEtel(id, (nev===""?jelenlegi.nev:nev), (leiras===""?jelenlegi.leiras:leiras), (kepnev===""?jelenlegi.kepnev:kepnev), (ar===""?jelenlegi.ar:ar), gluten, laktoz);
    }
    return res.redirect('/menu');
});

// #endregion
//#region arukeszlet
router.get("/arukeszlet", async(req, res) => {
    const token = req.cookies.jwt
    let current_role;
    const aruk =  await ArukeszletDAO.getAruk();

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }
    return res.render('arukeszlet', {
        current_role: current_role,
        aruk: aruk,
        aru: null
    });
})
router.post("/addAru", async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    let {nev} = req.body;
    let {mennyiseg} = req.body;
    let {holvantarolva} = req.body;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }
    if(current_role === "ROLE_ADMIN") {
        await ArukeszletDAO.addItem(nev, mennyiseg, holvantarolva);
    }
    //let user = await new UserDAO().getUserByEmail(email);
    return res.redirect('/arukeszlet')
});

router.get("/arukeszlet/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }
    let id = req.params.id;
    const aruk =  await ArukeszletDAO.getAruk();
    const aru = await ArukeszletDAO.getAru(id);

    res.render("arukeszlet", {
        aru: aru,
        aruk: aruk,
        current_role: current_role
    });
});

router.post("/editAru/:id", async (req, res) => {
    let id = req.params.id;
    let {nev} = req.body;
    let {mennyiseg} = req.body;
    let {holvantarolva} = req.body;

    await ArukeszletDAO.updateItem(id, nev, mennyiseg, holvantarolva);
    res.redirect("/arukeszlet");
});

router.post("/deleteAru/:id", async (req, res) => {
    let id = req.params.id;
    await ArukeszletDAO.deleteItem(id);
    res.redirect("/arukeszlet");
});
//#endregion
module.exports = router;