const db = require("oracledb");
const dbConfig = require("../config/database");
db.autoCommit = true;

/////////////
// USER
////////////
exports.getSzerzo = async () => {
    return await query(`SELECT * from SZERZO order by id`);
}
exports.getKategoria = async () => {
    return await query(`SELECT * from kategoria`);
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
exports.getRendelesek = async () => {
    return await query(`SELECT * FROM RENDELESEK`);
}
exports.setRendeles = async (isbn, fiokid, osszeg) => {
    return await query(`INSERT INTO RENDELESEK(ISBN, FIOK_ID, OSSZEG) VALUES(:isbn, :fiokid, :osszeg)`, [isbn, fiokid, osszeg]);
}
exports.getKepByISBN = async (isbn) => {
    return await query(`SELECT KEP from KONYV WHERE ISBN = :isbn`,[isbn]);
}

exports.getFiokByEmail = async (email) => {
    return await query(`SELECT * from FIOK WHERE email = :email`, [email]);
}

exports.getKep = async () => {
    return await query(`SELECT * from kep`);
}

exports.getKonyvById = async (id) => {
    return await query(`SELECT KONYV.ISBN as id, KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ár" FROM KONYV, KIADO WHERE KONYV.ISBN = :id`, [id]);
}

exports.uploadKonyv = async (nev, isbn, kiado, kategoria, oldalszam, mikor, ar) => {
    return await query(`INSERT INTO konyv(nev, isbn, kiado_id, kategoria_id, oldalszam, mikor, ar) 
    values(:nev, :isbn, :kiado_id, :kategoria_id, :oldalszam, to_date(:mikor, 'YYYY-MM-DD'), :ar)`,
        [nev, isbn, kiado, kategoria, oldalszam, mikor, ar])
}

exports.editKonyv = async (nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar) => {
    await query(`update  konyv set nev = :nev, isbn = :isbn_uj, kiado_id = :kiado_id, kategoria_id = :kategoria_id, oldalszam = :oldalszam, mikor = to_date(:mikor, 'YYYY-MM-DD'), ar = :ar where isbn = :isbn`,
        [nev, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, isbn])
}

exports.deleteKonyv = async (id) => {
    return await query(`delete from konyv where isbn = :id`,
        [id])
}

exports.uploadSzerzo = async (vezetek, kereszt) => {
    return await query(`INSERT INTO szerzo(vezeteknev, keresztnev) 
    values(:vez, :ker)`,
        [vezetek, kereszt])
}

exports.getKiado = async () => {
    return await query(`SELECT * from KIADO order by nev`);
}

exports.getBolt = async () => {
    return await query(`SELECT * from bolt`);
}

exports.getEverything = async (tabla) => {
    return await query(`select * from :tabla`, [tabla]);
}

exports.loginUser = async (email, password) => {
    return await query("select email from fiok where email = :email and jelszo = :jelszo", [email, password]);
}

exports.addUser = async (email, jelszo, keresztnev, vezeteknev) => {
    return await query(`insert into
     fiok(email, jelszo, torzsvasarlo, regisztralas_idopontja, keresztnev, vezeteknev)
     values(:email, :jelszo, 0, current_date, :keresztnev, :vezeteknev)`,
        [email, jelszo, keresztnev, vezeteknev]);
}

exports.uploadImage = async (kep) => {
    return await query(`insert into kep(kep) values (:kep)`, [kep]);
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

