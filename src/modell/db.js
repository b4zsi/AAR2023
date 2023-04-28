const db = require("oracledb");
const dbConfig = require("../config/database");
db.autoCommit = true;

/////////////
// USER
////////////
exports.getSzerzok = async () => {
    return await query(`SELECT * from SZERZO order by id`);
}
exports.getKategoria = async () => {
    return await query(`SELECT * from kategoria`);
}
exports.getKiadok = async () => {
    return await query(`SELECT * from KIADO`);
}
exports.getFiok = async () => {
    return await query(`SELECT EMAIL as "e-mail", concat(concat(keresztnev, ' '), vezeteknev) as nev  FROM FIOK`);
}
exports.getKonyv = async () => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar",KONYV.ISBN as "isbn" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}

/////////////
// USER
////////////
exports.getSzerzok = async () => {
    return await query(`SELECT * from SZERZO order by id`);
}
exports.getKategoria = async () => {
    return await query(`SELECT * from kategoria`);
}
exports.getKiadok = async () => {
    return await query(`SELECT * from KIADO`);
}
exports.getFiok = async () => {
    return await query(`SELECT EMAIL as "e-mail", concat(concat(keresztnev, ' '), vezeteknev) as nev  FROM FIOK`);
}
exports.getKonyv = async () => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar",KONYV.ISBN as "isbn", KONYV.KEP as "kep" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}
exports.getKonyByISBN = async (isbn) => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar", KONYV.ISBN FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID AND KONYV.ISBN = :isbn`, [isbn])
}
exports.getNyitvatartas = async () => {
    return await query(`SELECT * from nyitvatartas`);
}
exports.getBolt = async () => {
    return await query(`SELECT * from bolt`);
}
exports.getRendelesek = async () => {
    return await query(`SELECT * FROM RENDELESEK`);
}
exports.setRendeles = async (isbn, fiokid, osszeg) => {
    return await query(`INSERT INTO RENDELES(ISBN, FIOK_ID, OSSZEG) VALUES(:isbn, :fiokid, :osszeg)`, [isbn, fiokid, osszeg]);
}
exports.getKepByISBN = async (isbn) => {
    return await query(`SELECT KEP from KONYV WHERE ISBN = :isbn`,[isbn]);
}
exports.uploadKonyv = async (isbn, kiado_id, kategoria_id, oldalszam, ar,mikor, nev) => {
    return await query(`INSERT INTO konyv(isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev) 
    values(:isbn, :kiado_id, :kategoria_id, :oldalszam, :ar, :mikor, :nev)`, 
    [isbn, kiado_id, kategoria_id, oldalszam, ar, mikor, nev])
}

exports.getFiokByEmail = async (email) => {
    return await query(`SELECT * from FIOK WHERE email = :email`, [email]);
}

exports.addUser = async (email, jelszo, keresztnev, vezeteknev) => {
    return await query(`insert into
     fiok(email, jelszo, torzsvasarlo, regisztralas_idopontja, keresztnev, vezeteknev)
     values(:email, :jelszo, 0, current_date, :keresztnev, :vezeteknev)`,
        [email, jelszo, keresztnev, vezeteknev]);
}

exports.uploadImage = async (kep) => {
    return await query(`insert into kep(kep) values (:kep)`,[kep]);
}

exports.loginUser = async (email, password) => {
    return await query("select email from fiok where email = :email and jelszo = :jelszo", [email, password]);
}

async function query(query, list = []) {
    let result;
    let conn;
    try {
        conn = await db.getConnection(dbConfig);
        result = await conn.execute(query, list);

    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return result;

}

exports.getBolt = async () => {
    return await query(`SELECT * from bolt`);
}
exports.getFiokByEmail = async (email) => {
    return await query(`SELECT * from FIOK WHERE email = :email`, [email]);
}

exports.addUser = async (email, jelszo, keresztnev, vezeteknev) => {
    return await query(`insert into
     fiok(email, jelszo, torzsvasarlo, regisztralas_idopontja, keresztnev, vezeteknev)
     values(:email, :jelszo, 0, current_date, :keresztnev, :vezeteknev)`,
        [email, jelszo, keresztnev, vezeteknev]);
}

exports.loginUser = async (email, password) => {
    return await query("select email from fiok where email = :email and jelszo = :jelszo", [email, password]);
}

async function query(query, list = []) {
    let result;
    let conn;
    try {
        conn = await db.getConnection(dbConfig);
        result = await conn.execute(query, list);

    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return result;

}

