const query = require("./common").query;

exports.getFiok = async () => {
    return await query(`SELECT EMAIL as "e-mail", concat(concat(keresztnev, ' '), vezeteknev) as nev  FROM FIOK`);
}

exports.getKonyv = async () => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar",KONYV.ISBN as "isbn", KONYV.KEP as "kep" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}

exports.getKonyvByISBN = async (isbn) => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar", KONYV.ISBN FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID AND KONYV.ISBN = :isbn`, [isbn])
}
exports.getNyitvatartas = async () => {
    return await query(`SELECT concat(concat(bolt.telepules, concat(' ' , bolt.utca)), ' utca') as Bolt, nyitvatartas.nap as Nap, nyitvatartas.nyitas, nyitvatartas.zaras from nyitvatartas, bolt where nyitvatartas.bolt_id = bolt.id`);
}
exports.getRendelesek = async () => {
    return await query(`SELECT * FROM RENDELESEK`);
}

exports.getSzerzo = async () => {
    return await query(`SELECT id, concat(concat(vezeteknev, ' '), keresztnev) as Név FROM szerzo`);
}

exports.setRendeles = async (isbn, fiokid, osszeg, darab) => {
    return await query(`INSERT INTO RENDELES(ISBN, FIOK_ID, OSSZEG, DARAB) VALUES(:isbn, :fiokid, :osszeg, :darab)`, [isbn, fiokid, osszeg, darab]);
}
exports.getKepByISBN = async (isbn) => {
    return await query(`SELECT KEP from KONYV WHERE ISBN = :isbn`,[isbn]);
}

exports.getFiokByEmail = async (email) => {
    return await query(`SELECT * from FIOK WHERE email = :email`, [email]);
}

exports.loginUser = async (email, password) => {
    return await query("select email from fiok where email = :email and jelszo = :jelszo", [email, password]);
}

exports.addUser = async (email, jelszo, keresztnev, vezeteknev) => {
    return await query(`insert into
     fiok(email, jelszo, torzsvasarlo, regisztralas_idopontja, keresztnev, vezeteknev)
     values(:email, :jelszo, 0, current_date, :keresztnev, :vezeteknev)`,
        [email, jelszo, keresztnev, vezeteknev]);
}


exports.konyvszam_szerzo_szerint = async(vnev, knev) => {
    return await query(`SELECT konyvszam_szerzo_szerint(:vnev,:knev) from DUAL`,[vnev, knev]);
}

exports.szerzo_bevetel = async(vnev,knev) => {
    return await query(`SELECT szerzo_bevetel(:vnev,:knev) from DUAL`, [vnev, knev]);
}

exports.szallitasi_datum = async() => {
    return await query(`SELECT SZALLITASI_IDO() FROM DUAL`);
}

exports.ujjanon_konyvek = async(nap) => {
    return await query(`SELECT ujjanon_konyvek(:nap) FROM DUAL`,[nap])
}

exports.nepszeru_konyvek = async(darab) => {
    return await query(`SELECT nepszeru_konyvek(:darab) FROM DUAL`,[darab]);
}

