const db = require('../config/db');
const KosarDAO = require("./kosar-dao");

exports.addKosar = async (userid, etelid) => {
      let exist = await KosarDAO.getExistItem(userid, etelid);
      if(typeof exist === "undefined"){
          let mennyiseg = 1
          await db.query('INSERT INTO kosar (userid, etelid, mennyiseg) VALUES ($1, $2, $3)', [userid, etelid, mennyiseg]).catch(console.log);
      }
      else{
           let mennyiseg = exist.mennyiseg + 1
           await db.query('UPDATE kosar SET mennyiseg = $3 WHERE userid = $1 AND etelid = $2', [userid, etelid, mennyiseg]).catch(console.log);
      }
};

exports.deleteKosarByUserId = async (userid) =>{
    await db.query('DELETE FROM kosar WHERE userid=$1', [userid]).catch(console.log);
}

exports.plusItem = async (userid, etelid) =>{
    let exist = await KosarDAO.getExistItem(userid, etelid);
    let mennyiseg = exist.mennyiseg + 1;
    await db.query('UPDATE kosar SET mennyiseg = $3 WHERE userid = $1 AND etelid = $2', [userid, etelid, mennyiseg]).catch(console.log);
};

exports.minusItem = async (userid, etelid) => {
    let exist = await KosarDAO.getExistItem(userid, etelid);
    let mennyiseg = exist.mennyiseg - 1;
    if (mennyiseg === 0){
        await db.query('DELETE FROM kosar WHERE userid=$1 AND etelid=$2', [userid, etelid]).catch(console.log);
    }else{
        await db.query('UPDATE kosar SET mennyiseg = $3 WHERE userid = $1 AND etelid = $2', [userid, etelid, mennyiseg]).catch(console.log);
    }
};

exports.deleteItem = async (userid, etelid) => {
    await db.query('DELETE FROM kosar WHERE userid=$1 AND etelid=$2', [userid, etelid]).catch(console.log);
}
      
exports.getKosar = async (userid) => {
    let results = await db.query(`SELECT * FROM etelek INNER JOIN kosar ON kosar.etelid=etelek.id WHERE userid=$1`, [userid]).catch(console.log);
    return results.rows;
};

exports.getExistItem = async (userid, etelid) => {
    let result = await db.query('SELECT * FROM kosar WHERE userid = $1 AND etelid = $2', [userid, etelid])
        .catch(console.log);
    return result.rows[0];
};

exports.vegosszeg = async (userid) =>{
    let vegosszeg = await db.query('SELECT SUM(ar*kosar.mennyiseg) FROM etelek INNER JOIN kosar ON kosar.etelid=etelek.id WHERE userid=$1', [userid]).catch(console.log);
    return vegosszeg.rows[0].sum;
};