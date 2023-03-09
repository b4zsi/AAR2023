const db = require('../config/db');

exports.allRendeles = async () => {
    let result = await db.query('SELECT rendeles.id, rendeles.user_id, email, idopont, ar FROM rendeles, users WHERE rendeles.user_id = users.id').catch(console.log);
    return result.rows;
}

exports.addRendeles = async (userid, ar) =>{
    await db.query('INSERT INTO rendeles (user_id, idopont, ar) VALUES ($1, Now(), $2)', [parseInt(userid), parseInt(ar)])
        .catch(console.log);
}

exports.updateRendelesArById = async (id, ar) =>{
    await db.query('UPDATE rendeles SET ar = $2 WHERE id = $1', [parseInt(id), parseInt(ar)])
        .catch(console.log);
}

exports.addRendelesEtel = async (rendeles_id, etel_id, mennyiseg) =>{
    await db.query('INSERT INTO rendeles_etel (rendeles_id, etel_id, mennyiseg) VALUES ($1, $2, $3)', [parseInt(rendeles_id), parseInt(etel_id), parseInt(mennyiseg)])
        .catch(console.log);
}

exports.updateRendelesEtelMennyiseg = async (rendeles_id, etel_id, mennyiseg) => {
    await db.query(`UPDATE rendeles_etel SET mennyiseg = $3 WHERE rendeles_id = $1 AND etel_id = $2`, [parseInt(rendeles_id), parseInt(etel_id), parseInt(mennyiseg)])
        .catch(console.log);
}

exports.getRendelesEtelekById = async (rendeles_id) =>{
    let result = await db.query('SELECT * FROM rendeles_etel, etelek WHERE rendeles_id = $1 AND etel_id = etelek.id ORDER BY etel_id', [parseInt(rendeles_id)])
        .catch(console.log);
    return result.rows;
}

exports.getRendelesById = async (id) =>{
    let result = await db.query('SELECT * FROM rendeles WHERE id = $1', [parseInt(id)])
        .catch(console.log);
    return result.rows[0];
}

exports.getRendelesByUserId = async (userid) =>{
    let result = await db.query('SELECT id FROM rendeles WHERE user_id = $1 ORDER BY id DESC', [parseInt(userid)])
        .catch(console.log);
    return result.rows[0];
}

exports.getRendelesekByUserId = async (userid) =>{
    let result = await db.query('SELECT * FROM rendeles WHERE user_id = $1', [parseInt(userid)])
        .catch(console.log);
    return result.rows;
}