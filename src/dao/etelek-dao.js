const db = require('../config/db');
const EtelDAO = require("./etelek-dao");

exports.getEtelek = async (laktoz, gluten) => {
    let result;
    if(gluten == 1 && laktoz == 1){
        result = await db.query(`SELECT mentes.etelid, etelek.id, COUNT(mentes.etelid), etelek.nev, etelek.leiras, etelek.kepnev, etelek.ar FROM etelek, mentes WHERE mentes.etelid = etelek.id GROUP BY mentes.etelid, etelek.id HAVING COUNT(mentes.etelid) > 1`).
        catch(console.log);
    }
    else if(gluten == 1){
        result = await db.query(`SELECT * FROM etelek INNER JOIN mentes ON mentes.etelid = etelek.id AND mentes.erzekenysegid = 2`).
        catch(console.log);
    }
    else if(laktoz == 1){
        result = await db.query(`SELECT * FROM etelek INNER JOIN mentes ON mentes.etelid = etelek.id AND mentes.erzekenysegid = 1`).
        catch(console.log);
    }else{
        result = await db.query(`SELECT * FROM etelek ORDER BY id`).
        catch(console.log);
    }

    return result.rows;
};

exports.getEtel = async (id) => {
    let result = await db.query('SELECT * FROM etelek WHERE id = $1', [id])
        .catch(console.log);
    return result.rows[0];
};

exports.getEtelByNev = async (nev) => {
    let result = await db.query('SELECT * FROM etelek WHERE nev = $1', [nev])
        .catch(console.log);
    return result.rows[0];
};

exports.getEtelId = async (nev, leiras, ar) => {
    let result = await db.query('SELECT id FROM etelek WHERE nev = $1 AND leiras = $2 AND ar = $3', [nev, leiras, ar])
        .catch(console.log);
    return result.rows[0].id;
};

exports.addEtel = async (nev, leiras, kepnev, ar, laktoz, gluten) => {
    await db.query('INSERT INTO etelek (nev, leiras, kepnev, ar) VALUES ($1, $2, $3, $4)', [nev, leiras, kepnev, ar])
        .catch(console.log)

    let etelid = await EtelDAO.getEtelId(nev, leiras, ar)
    let erzekenysegGl = await EtelDAO.getErzekenysegIdByNev("Glutén")
    let erzekenysegLa = await EtelDAO.getErzekenysegIdByNev("Laktóz")
    let erzekenysegGlId = erzekenysegGl.id
    let erzekenysegLaId = erzekenysegLa.id

    if(laktoz==="TRUE"){
        await db.query('INSERT INTO mentes (erzekenysegid, etelid) VALUES ($1, $2)', [erzekenysegLaId, etelid])
            .catch(console.log);
    }
    if(gluten==="TRUE"){
        await db.query('INSERT INTO mentes (erzekenysegid, etelid) VALUES ($1, $2)', [erzekenysegGlId, etelid])
            .catch(console.log);
    }
};

exports.updateEtel = async (id, nev, leiras, kepnev, ar, gluten, laktoz) => {
    await db.query(`UPDATE etelek SET nev = $2, leiras = $3, kepnev = $4, ar = $5 WHERE id = $1`, [parseInt(id), nev, leiras, kepnev, ar])
        .catch(console.log);

    let erzekenysegGl = await EtelDAO.getErzekenysegIdByNev("Glutén");
    let erzekenysegLa = await EtelDAO.getErzekenysegIdByNev("Laktóz");
    let erzekenysegGlId = erzekenysegGl.id;
    let erzekenysegLaId = erzekenysegLa.id;
    let mentesGL = await EtelDAO.getMentessegByEtelid(id, erzekenysegGlId);
    let mentesLA = await EtelDAO.getMentessegByEtelid(id, erzekenysegLaId);

    if(gluten==="TRUE" && mentesGL.length === 0){
        await db.query('INSERT INTO mentes (erzekenysegid, etelid) VALUES ($1, $2)', [erzekenysegGlId, parseInt(id)])
            .catch(console.log);
    }else if(typeof gluten === "undefined" && mentesGL.length !== 0){
        await db.query('DELETE FROM mentes WHERE etelid=$1 AND erzekenysegid = $2', [parseInt(id), erzekenysegGlId])
            .catch(console.log);
    }
    if(laktoz==="TRUE" && mentesLA.length === 0){
        await db.query('INSERT INTO mentes (erzekenysegid, etelid) VALUES ($1, $2)', [erzekenysegLaId, parseInt(id)])
            .catch(console.log);
    }else if(typeof laktoz === "undefined" && mentesLA.length !== 0){
        await db.query('DELETE FROM mentes WHERE etelid=$1 AND erzekenysegid = $2', [parseInt(id), erzekenysegLaId])
            .catch(console.log);
    }
};

exports.deleteEtel = async (id) => {
    await db.query('DELETE FROM mentes WHERE etelid=$1', [id])
        .catch(console.log);
    await db.query(`DELETE FROM etelek WHERE id=$1`, [parseInt(id)])
        .catch(console.log);
};

exports.getErzekenysegByEtelid = async (etelid) =>{
    let result = await db.query('SELECT erzekenyseg FROM erzekenysegek INNER JOIN mentes ON mentes.erzekenysegid = erzekenysegek.id WHERE etelid = $1', [etelid])
    return result.rows;
};

exports.getMentesseg = async () =>{
    let result = await db.query('SELECT erzekenysegek.erzekenyseg, mentes.etelid FROM erzekenysegek INNER JOIN mentes ON mentes.erzekenysegid = erzekenysegek.id')
        .catch(console.log);
    return result.rows;
};

exports.getMentessegByEtelid = async (etelid, erzekenysegid) =>{
    let result = await db.query('SELECT * FROM mentes WHERE etelid = $1 AND erzekenysegid = $2', [etelid, erzekenysegid])
        .catch(console.log);
    return result.rows;
};

exports.getErzekenysegIdByNev = async (erzekenyseg) => {
    let result = await db.query('SELECT id FROM erzekenysegek WHERE erzekenyseg = $1', [erzekenyseg])
        .catch(console.log);
    return result.rows[0];
};

exports.getEtelekByMentesseg = async (gluten, laktoz) => {
    let result = await db.query('SELECT * FROM etelek')
        .catch(console.log);
    return result.rows;
}