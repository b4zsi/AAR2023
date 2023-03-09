const db = require('../config/db');
const UserDAO = require("./user-dao");

exports.createUser = async (email, password, felhnev, address, tel, nem, gluten, laktoz) => {
    await db.query('INSERT INTO users (email, password, felhnev, address, tel, nem) VALUES ($1, $2, $3, $4, $5, $6)', [email, password, felhnev, address, tel, nem])
        .catch(console.log)

    let user = await UserDAO.getUserByEmail(email)
    let userid = user.id
    let erzekenysegGl = await UserDAO.getErzekenysegIdByNev("Glutén")
    let erzekenysegLa = await UserDAO.getErzekenysegIdByNev("Laktóz")
    let erzekenysegGlId = erzekenysegGl.id
    let erzekenysegLaId = erzekenysegLa.id

    if(laktoz==="TRUE"){
        await db.query('INSERT INTO erzekeny (userid, erzekenysegid) VALUES ($1, $2)', [userid, erzekenysegLaId]).catch(console.log);
    }
    if(gluten==="TRUE"){
        await db.query('INSERT INTO erzekeny (userid, erzekenysegid) VALUES ($1, $2)', [userid, erzekenysegGlId]).catch(console.log);
    }
};


exports.updateUser = async (id, email, passwd, fnev, address,tel) => {
    await db.query(`UPDATE users SET email = $2, felhnev = $3, address = $4, password = $5, tel = $6 WHERE id = $1`, [parseInt(id), email, fnev, address,passwd,tel])
        .catch(console.log);
};

exports.getUsers = async () => {
    let results = await db.query(`SELECT * FROM users`).
    catch(console.log);
    return results.rows;
};

exports.getUserById = async (id) => {
    let result = await db.query('SELECT * FROM users WHERE id = $1', [id])
        .catch(console.log);
    return result.rows[0];
};

exports.getUserEmails = async () => {
    let result = await db.query('SELECT * FROM users')
        .catch(console.log);
    return result.rows;
};

exports.getUserByEmail = async (email) => {
    let result = await db.query('SELECT * FROM users WHERE email = $1', [email])
        .catch(console.log);
    return result.rows[0];
};

exports.getErzekenysegIdByNev = async (erzekenyseg) => {
    let result = await db.query('SELECT id FROM erzekenysegek WHERE erzekenyseg = $1', [erzekenyseg])
        .catch(console.log);
    return result.rows[0];
};

exports.deleteUserById = async (id) => {
    let result = await db.query('SELECT * FROM rendeles WHERE user_id = $1', [parseInt(id)])
        .catch(console.log);
    for (let i = 0; i < result.length; i++){
        await db.query('DELETE FROM rendeles_etel WHERE rendeles_id = $1', [parseInt(result[i].id)])
            .catch(console.log);
    }
    await db.query('DELETE FROM rendeles WHERE user_id = $1', [parseInt(id)])
        .catch(console.log);
    await db.query('DELETE FROM erzekeny WHERE userid = $1', [id])
       .catch(console.log);
    await db.query('DELETE FROM ertekelesek WHERE user_id = $1', [id])
        .catch(console.log);
    await db.query('DELETE FROM kosar WHERE userid = $1', [id])
        .catch(console.log);
    await db.query('DELETE FROM users WHERE id = $1', [id])
        .catch(console.log);
};