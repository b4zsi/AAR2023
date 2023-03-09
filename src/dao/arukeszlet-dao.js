const db = require('../config/db');

exports.getAruk = async () => {
    let results = await db.query(`SELECT * FROM arukeszlet ORDER BY id`).
    catch(console.log);
    return results.rows;
};

exports.getAru = async (id) => {
    let result = await db.query('SELECT * FROM arukeszlet WHERE id = $1', [id])
        .catch(console.log);
    return result.rows[0];
};

exports.addItem = async (nev, mennyiseg, holvantarolva) => {
    await db.query('INSERT INTO arukeszlet (nev, mennyiseg, holvantarolva) VALUES ($1, $2, $3)', [nev, mennyiseg, holvantarolva])
        .catch(console.log);
};

exports.updateItem = async (id, nev, mennyiseg, holvantarolva) => {
    await db.query(`UPDATE arukeszlet SET nev = $2, mennyiseg = $3, holvantarolva = $4 WHERE id = $1`, [parseInt(id), nev, mennyiseg, holvantarolva])
        .catch(console.log);
};

exports.deleteItem = async (id) => {
    await db.query(`DELETE FROM arukeszlet WHERE id=$1`, [parseInt(id)])
        .catch(console.log);
};