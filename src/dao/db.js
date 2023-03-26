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
        result = await conn.execute(`SELECT * FROM KONYV`);

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

