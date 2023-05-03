const query = require("./common").query;
const queryWithRollback = require("./common").queryWithRollback;

exports.getFiok = async () => {
    return await query(`SELECT EMAIL as "e-mail", concat(concat(keresztnev, ' '), vezeteknev) as nev  FROM FIOK`);
}

exports.getKonyv = async () => {
    return await query(`SELECT KONYV.NEV as "Név", KONYV.OLDALSZAM as "Oldal", KIADO.NEV as "Kiado", KONYV.AR as "Ar",KONYV.ISBN as "isbn", KONYV.KEP as "kep" FROM KONYV, KIADO WHERE KONYV.KIADO_ID = KIADO.ID`);
}

exports.getKonyvByISBN = async (isbn) => {
    return await query(`SELECT KONYV.KEP as "Kép", KONYV.NEV as "Név", SZERZO.KERESZTNEV as "Keresztnév", SZERZO.VEZETEKNEV as "Vezeteknév", KONYV.AR as "Ar", KONYV.ISBN FROM KONYV, SZERZO, IRTA WHERE SZERZO.ID = IRTA.SZERZO_ID AND KONYV.ISBN = :isbn`, [isbn])
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

exports.setRendeles = async (fiokid, osszeg) => {
    return await query(`INSERT INTO RENDELES(FIOK_ID, OSSZEG) VALUES(:fiokid, :osszeg)`, [fiokid, osszeg]);
}

exports.deleteRendelesOnFail = async () => {
    return await query(`DELETE FROM RENDELES WHERE ID = (SELECT MAX(ID) FROM RENDELES)`);
}

exports.queryForRendelesiTetelek = (rendeles_id, isbn, darab) => {
    return `INSERT INTO RENDELESI_TETELEK(RENDELES_ID, ISBN, DARAB) VALUES(${rendeles_id}, ${isbn}, ${darab})`;
}

exports.getLegujabbRendeles = async () => {
    return await query(`SELECT MAX(ID) FROM RENDELES`);
}

exports.setRendelesVeg = async (queries) => {
    return await queryWithRollback(queries);
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

exports.legkelendobb_szerzo_konyvei = async(darab) => {
    return await query(`SELECT szerzo_bevetel(:darab) from DUAL`, [darab]);
}

exports.szallitasi_ido = async() => {
    return await query(`SELECT szallitasi_ido() FROM DUAL`);
}

exports.ujjanon_konyvek = async(nap) => {
    return await query(`SELECT ujjanon_konyvek(:nap) FROM DUAL`,[nap])
}

exports.nepszeru_konyvek = async(darab) => {
    return await query(`SELECT nepszeru_konyvek(:darab) FROM DUAL`,[darab]);
}

//lekerdezesek
exports.bestSzerzo = async() => {
    return await query(`SELECT VEZETEKNEV, KERESZTNEV FROM IRTA, SZERZO, KONYV WHERE KONYV.ISBN = 
    (SELECT ISBN FROM RENDELESI_TETELEK GROUP BY ISBN ORDER BY SUM(DARAB) DESC FETCH FIRST 1 ROWS ONLY) 
    AND KONYV.ISBN = IRTA.ISBN AND IRTA.SZERZO_ID = SZERZO.ID`);
}

exports.bestKategoria = async() => {
    return await query(`SELECT KATEGORIA.NEV FROM KATEGORIA, KONYV WHERE KONYV.ISBN = 
    (SELECT ISBN FROM RENDELESI_TETELEK GROUP BY ISBN ORDER BY SUM(DARAB) DESC FETCH FIRST 1 ROWS ONLY)
    AND KATEGORIA.ID = KONYV.KATEGORIA_ID`);
}

exports.bestKiado = async() => {
    return await query(`SELECT KIADO.NEV FROM KIADO, KONYV WHERE KONYV.ISBN = 
    (SELECT ISBN FROM RENDELESI_TETELEK GROUP BY ISBN ORDER BY SUM(DARAB) DESC FETCH FIRST 1 ROWS ONLY)
    AND KIADO.ID = KONYV.KIADO_ID`);
}

exports.bestUserek = async() => {
    return await query(`SELECT VEZETEKNEV, KERESZTNEV FROM FIOK WHERE FIOK.ID IN 
    (SELECT FIOK_ID FROM RENDELES GROUP BY FIOK_ID ORDER BY COUNT(*) DESC FETCH FIRST 2 ROWS ONLY)`);
}

exports.utoloDarabok = async() => {
    return await query(`SELECT KONYV.NEV, SZAM FROM KONYV INNER JOIN 
    (SELECT ISBN AS BELSO_ISBN, SUM(DARABSZAM) AS SZAM FROM ARUL GROUP BY ISBN HAVING SUM(DARABSZAM) > 0 AND SUM(DARABSZAM) < 3 ORDER BY 
    SUM(DARABSZAM) ASC FETCH FIRST 5 ROWS ONLY) ON KONYV.ISBN = BELSO_ISBN`);
}

exports.elfogyott = async() => {
    return await query(`SELECT KONYV.NEV, KIADO.NEV FROM KIADO, KONYV INNER JOIN (SELECT ISBN AS BELSO_ISBN, 
        SUM(DARABSZAM) AS SZAM FROM ARUL GROUP BY ISBN 
        ORDER BY SUM(DARABSZAM) ASC) ON KONYV.ISBN = BELSO_ISBN WHERE SZAM = 0 AND KONYV.KIADO_ID = KIADO.ID`);
}

exports.bestKategoriabestSeller = async() => {
    return await query(`SELECT KONYV.NEV, KIADO.NEV FROM KIADO, KONYV WHERE KONYV.KATEGORIA_ID = 
    (SELECT KATEGORIA.ID FROM KATEGORIA, KONYV WHERE KONYV.ISBN = 
    (SELECT ISBN FROM RENDELESI_TETELEK GROUP BY ISBN ORDER BY SUM(DARAB) DESC FETCH FIRST 1 ROWS ONLY)
    AND KATEGORIA.ID = KONYV.KATEGORIA_ID) AND KONYV.KIADO_ID = KIADO.ID FETCH FIRST 3 ROWS ONLY`);
}

