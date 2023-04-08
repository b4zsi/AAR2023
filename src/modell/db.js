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
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
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
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}
exports.getNyitvatartas = async () => {
    return await query(`SELECT * from nyitvatartas`);
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

