const db = require("oracledb");
const dbConfig = require("../config/database");

/////////////
// USER
////////////
exports.addUser = async (email, jelszo, keresztnev, vezeteknev) => {

}


exports.getKonyv = async () => {
    let result;
    let conn;
    try {
        conn = await db.getConnection(dbConfig);
        result = await conn.execute(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);

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

