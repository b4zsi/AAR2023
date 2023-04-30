const db = require("oracledb");
const dbConfig = require("../config/database");

exports.getAllKonyv = async () => {
    return await query(`SELECT * from konyv`);
}

exports.getKonyvByISBN = async (id) => {
    return await query(`SELECT * FROM KONYV WHERE KONYV.ISBN = :id`, [id]);
}

exports.getAllSzerzo = async () => {
    return await query(`SELECT * from SZERZO`);
}

exports.getSzerzoById = async (id) => {
    return await query(`SELECT * from SZERZO where id = :id`, [id]);
}

exports.getAllKategoria = async () => {
    return await query(`SELECT * from kategoria`);
}

exports.getKategoriaById = async (id) => {
    return await query(`SELECT * from kategoria where id = :id`, [id]);
}

exports.getAllKiado = async () => {
    return await query(`SELECT * from KIADO order by nev`);
}

exports.getKiadoById = async (id) => {
    return await query(`SELECT * from kiado where id = :id`, [id]);
}

exports.getAllRendelesek = async () => {
    return await query(`SELECT * FROM RENDELESEK`);
}

exports.getAllBolt = async () => {
    return await query(`SELECT * from bolt`);
}

exports.getBoltById = async (id) => {
    return await query(`SELECT * from bolt where id = :id`, [id]);
}

async function query (query, list = []) {
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

exports.query = query;
