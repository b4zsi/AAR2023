const bcrypt = require("bcryptjs");
const UserDAO = require('../dao/user-dao');
const KosarDAO = require('../dao/kosar-dao');
const EtelDAO = require('../dao/etelek-dao');
const ErtekelesDAO = require('../dao/ertekeles-dao');
const RendelesDAO = require('../dao/rendeles-dao');
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const nodemailer = require('nodemailer');
const isEmail = require("./../config/regex.js").isEmail;
const PasswordVerify = require("./../config/regex.js").PasswordVerify;
const isPhone = require("./../config/regex.js").isPhone;
const mailData = require("./../config/mail.js").mailData;

//---------------------Főoldal---------------------//

exports.get_fo_oldal = async (req, res) => {
    const token = req.cookies.jwt;
    let current_email;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        });
    }

    return res.render('index', {
        current_email: current_email,
        current_role: current_role,
        token: token
    });
}

//---------------------Főoldal---------------------//

//---------------------Menü---------------------//

exports.get_menu = async (req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;
    let {laktoz} = req.query;
    let {gluten} = req.query;

    const etelek = await EtelDAO.getEtelek(laktoz, gluten);
    const mentessegek = await EtelDAO.getMentesseg();

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        });
    }

    return res.render('menu', {
        current_email: current_email,
        current_role: current_role,
        etelek: etelek,
        etel:null,
        mentessegek: mentessegek
    });
}

exports.post_menu = async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    let etelid = req.params.id;
    let userid;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
            userid = decodedToken.id;
        });
    }
    if(current_role === "ROLE_USER") {
        await KosarDAO.addKosar(userid, etelid);
    }

    return res.redirect('/menu');
}

//---------------------Menü---------------------//

//---------------------Kosár---------------------//

exports.get_kosar = async (req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;
    let userid;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
            userid = decodedToken.id;
        });
    }

    const etelek = await KosarDAO.getKosar(userid);
    const vegosszeg = await KosarDAO.vegosszeg(userid);

    return res.render('kosar', {
        current_email: current_email,
        current_role: current_role,
        etelek: etelek,
        vegosszeg: vegosszeg
    });
}

exports.post_kosar = async (req, res) => {
    const token = req.cookies.jwt
    let current_id;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let {btn} = req.body;
    let etelid = req.params.id;
    if(current_role === "ROLE_USER") {
        if (btn === "add") {
            await KosarDAO.plusItem(current_id, etelid);
        }else if(btn === "minus"){
            await KosarDAO.minusItem(current_id, etelid);
        }else {
            await KosarDAO.deleteItem(current_id, etelid);
        }
    }

    return res.redirect('/kosar');
}

//---------------------Kosár---------------------//

//---------------------Fizetés------------------ //

exports.get_fizetes = async(req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;
    let userid;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
            userid = decodedToken.id;
        });
    }

    const helyadatok = await UserDAO.getUserById(userid);
    const etelek = await KosarDAO.getKosar(userid);
    const vegosszeg = await KosarDAO.vegosszeg(userid);

    return res.render('fizetes', {
        current_email: current_email,
        current_role: current_role,
        etelek: etelek,
        vegosszeg: vegosszeg,
        adatok: helyadatok,
        ar : 0
    });
}

exports.post_fizetes = async(req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;
    let userid;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
            userid = decodedToken.id;
        });
    }

    kosar = await KosarDAO.getKosar(userid);
    let ar = 0;
    for (let i = 0; i < kosar.length; i++){
        ar += kosar[i].ar * kosar[i].mennyiseg;

    }

    await RendelesDAO.addRendeles(kosar[0].userid, ar);

    let id = await RendelesDAO.getRendelesByUserId(kosar[0].userid);

    for (let i = 0; i < kosar.length; i++){
        await RendelesDAO.addRendelesEtel(id.id, kosar[i].etelid, kosar[i].mennyiseg);
    }

    await KosarDAO.deleteKosarByUserId(kosar[0].userid);

    res.redirect('/');
}

//---------------------Fizetés------------------ //

//---------------------Regisztráció------------------ //

exports.get_register = async(req, res) => {
    const token = req.cookies.jwt
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }
    return res.render('register', {
        current_role: current_role,
        hibak: null
    });
}

exports.post_register =  async(req, res) => {
    let {email} = req.body;
    let {password} = req.body;
    let {felhnev} = req.body;
    let {address} = req.body;
    let {tel} = req.body;
    let {nem} = req.body;
    let {gluten} = req.body;
    let {laktoz} = req.body;
    let hibak = [];

    let user =  await UserDAO.getUserByEmail(email);

    if (typeof user != "undefined"){
        hibak.push("Ez az email cím már foglalt!");
    }

    if (!PasswordVerify(password)){
        hibak.push("A jelszónak legalább 8 karakter hosszúnak kell lennie és tartalmazni kell egy számot, illetve kis- és nagybetűt");
    }

    if (!isPhone(tel)){
        hibak.push("A telefonszám formátuma nem megfelelő. Kérlek így add meg: 06301234567");
    }
    if (!isEmail(email)){
        hibak.push("Hibás e-mail formátum. Kérlek ebben a formában add meg: valami@valami.valami");
    }

    if(hibak.length){
        return res.render('register', {
            current_role: "",
            email:email,
            password:password,
            hibak: hibak
        });
    }else {

        const mailOptions = {
            from: 'etteremrf1@outlook.com',
            to: email,
            subject: 'RF1 projekt',
            text: 'Sikeres regisztráció! Jó étvágyat!'
        };

        mailData.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            }
            else {
                console.log('Sikeres email kuldes: ' + info.response);
            }
        });
        bcrypt.hash(password, 10).then(async(hash) => {
            await UserDAO.createUser(email, hash, felhnev, address, tel, nem, gluten, laktoz);
            user = await UserDAO.getUserByEmail(email);
        });

        return res.redirect('/');
    }
}

//---------------------Regisztráció------------------ //

//---------------------Bejelentkezés------------------ //

exports.get_login = async(req, res) => {
    const token = req.cookies.jwt
    if (token) {
        res.redirect('/');
    }
    return res.render('login', {
        current_role: "",
        email: "",
        password: "",
        hibak: ""
    });
}

exports.post_login = async(req, res) => {
    let {email} = req.body;
    let {password} = req.body;

    const token = req.cookies.jwt;
    if (token) {
        res.redirect('/');
    }

    const user = await UserDAO.getUserByEmail(email);
    if (!user) {
        return res.render('login', {
            current_role: "",
            email:email,
            password:password,
            hibak: ["Hibás felhasználónév vagy jelszó."]
        });
    } else {
        bcrypt.compare(password, user.password).then( (result) => {
            if (result) {
                const token = jwt.sign({
                        id: user.id,
                        email,
                        role: user.role
                    },
                    jwtSecret.jwtSecret
                );
                res.cookie("jwt", token, {
                    httpOnly: true
                });
                return res.redirect('/');
            } else {
                return res.render('login', {
                    current_role: "",
                    email:email,
                    password:password,
                    hibak: ["Hibás felhasználónév vagy jelszó."]
                });
            }
        });
    }
}

//---------------------Bejelentkezés------------------ //

//---------------------Kijelentkezés------------------ //

exports.get_logout = async (req, res) => {
    res.cookie("jwt", "", {
        maxAge: "1"
    })
    res.redirect("/")
}

//---------------------Kijelentkezés------------------ //

//---------------------Profil------------------ //

exports.get_profil = async(req, res) => {
    const token = req.cookies.jwt;
    let current_email;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        });
    }

    const users = await UserDAO.getUsers();
    const user =  await UserDAO.getUserByEmail(current_email);
    return res.render('profil', {
        current_role: current_role,
        current_email: current_email,
        current_user: user,
        current_users: users
    });
}

exports.get_update_profil = async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;

    let current_role;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }
    let user =  await UserDAO.getUserById(id);

    res.render("updateProfil", {
        user: user,
        current_role: current_role,
        hibak : null
    });
}

exports.post_update_profil = async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }

    let user = await UserDAO.getUserById(req.params.id)
    let {email} = req.body;
    let {fnev} = req.body;
    let {tel} = req.body;
    let {address} = req.body;
    let {passwd} = req.body;
    let new_user = await UserDAO.getUserByEmail(email);
    let hibak=[];

    if(typeof new_user != "undefined" && new_user.id != user.id){
        hibak.push(" Hiba:Ez az email cím már foglalt!\n")
    }

    if(!isPhone(tel)){
        hibak.push(" Hiba:A telefonszám formátuma nem megfelelő. Kérlek így add meg: 06301234567!\n")
    }

    if(!isEmail(email)){
        hibak.push(" Hiba:Hibás e-mail formátum. Kérlek ebben a formában add meg: valami@valami.valami!\n")
    }

    if(passwd !== "" && !PasswordVerify(passwd)){
        hibak.push(" Hiba:A jelszónak legalább 8 karakter hosszúnak kell lennie és tartalmazni kell egy számot, illetve kis- és nagybetűt!\n")
    }

    if(hibak.length){
        return res.render('updateProfil', {
            user: user,
            current_role: current_role,
            hibak: hibak
        });
    }else{
        if(passwd === ""){
            await UserDAO.updateUser(user.id, email, user.password, fnev, address, tel);
        }
        else{
            bcrypt.hash(passwd, 10).then(async(hash) => {
                await UserDAO.updateUser(user.id, email, hash, fnev, address, tel);
            });
        }

        if (current_role ==='ROLE_ADMIN'){
            return res.redirect('/profil');
        }

        const newtoken = jwt.sign({
                id: user.id,
                email: email,
                role: user.role
            },
            jwtSecret.jwtSecret
        );

        res.cookie("jwt", newtoken, {
            httpOnly: true
        });

        return res.redirect('/profil');
    }
}

exports.post_delete_profil = async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        });
    }

    let id = req.params.id;
    await UserDAO.deleteUserById(id);

    if (current_role !== "ROLE_ADMIN") {
        res.cookie("jwt", "", {
            maxAge: "1"
        })
        res.redirect("/");
    }
    else{
        res.redirect("/profil");
    }

}

//---------------------Profil------------------ //

//---------------------Értékelés------------------ //

exports.get_ertekeles = async (req, res) => {
    const token = req.cookies.jwt
    let current_email;
    let current_role;

    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        });
    }

    let ertekeles_id = req.query.id;
    let vanErtekeles;
    const ertekelesek = await ErtekelesDAO.getErtekelesek();
    if(current_email)
        vanErtekeles = await ErtekelesDAO.vanErtekeles(current_email);

    return res.render('ertekelesek', {
        current_email: current_email,
        current_role: current_role,
        ertekelesek: ertekelesek,
        ertekeles_id: ertekeles_id,
        vanErtekeles: vanErtekeles
    });
}

exports.post_add_ertekeles = async (req, res) => {
    let {csillag, email, leiras} = req.body;
    if(!isNaN(csillag) && email && leiras){
        let user = await UserDAO.getUserByEmail(email);
        await ErtekelesDAO.addErtekeles(csillag, user.id, leiras);

    }
    res.redirect('/ertekeles');

}

exports.post_edit_ertekeles = async (req, res) => {
    let {uj_id, csillag, leiras} = req.body;

    await ErtekelesDAO.editErtekeles(uj_id, csillag, leiras);
    res.redirect('/ertekeles');

}

exports.post_del_ertekeles = async (req, res) => {
    let {id} = req.body;
    await ErtekelesDAO.delErtekeles(id);

    res.redirect('/ertekeles');
}

//---------------------Értékelés------------------ //
