const db = require('../config/db');

exports.getErtekelesek = async () => {
    let results = await db.query(`SELECT ertekelesek.id, users.email, users.felhnev as nev, ertekelesek.csillag, ertekelesek.leiras FROM ertekelesek, users WHERE users.id = ertekelesek.user_id`)
        .catch(console.log);
    return results.rows;
};

exports.addErtekeles = async (csillag, user_id, leiras) => {
    await db.query('INSERT INTO ertekelesek (csillag, user_id, leiras) VALUES ($1, $2, $3)', [csillag, user_id, leiras])
        .catch(console.log)
};

exports.editErtekeles = async (id, csillag, leiras) => {
    await db.query('UPDATE ertekelesek SET csillag=$1, leiras=$2 WHERE id=$3 ', [csillag, leiras, id])
        .catch(console.log)
};

exports.delErtekeles = async (id) => {
    await db.query('DELETE FROM ertekelesek WHERE id=$1', [id])
        .catch(console.log)
};

exports.vanErtekeles = async (user_email) => {
    let res = await db.query('SELECT * FROM ertekelesek, users WHERE ertekelesek.user_id=users.id AND users.email=$1', [user_email])
        .catch(console.log)
    return res.rows.length > 0;
};