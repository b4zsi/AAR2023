const db = require("oracledb");
const dbConfig = require("../config/database");

/////////////
// USER
////////////

exports.getSzerzok = async () => {
    return await query(`SELECT * from SZERZO`);
}

exports.getFiok = async () => {
    return await query(`SELECT EMAIL as "e-mail", concat(concat(keresztnev, ' '), vezeteknev) as nev  FROM FIOK`);
}

exports.getKonyv = async () => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}

async function query(query, list = []){
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

