const query = require("./common").query;

exports.getKonyv = async () => {
    return await query(`SELECT 
        KONYV.ISBN as "ISBN",
        KONYV.NEV as "Név",
        KATEGORIA.NEV as "Kategória",
        KIADO.NEV as "Kiado",
        KONYV.OLDALSZAM as "Oldal",
        KONYV.AR as "Ár",
        KONYV.KEP as "Kép"
        FROM KONYV, KIADO, KATEGORIA
        WHERE
        KONYV.KIADO_ID = KIADO.ID AND
        KATEGORIA.ID = KONYV.KIADO_ID`)
}

exports.getKonyvByISBN = async (isbn) => {
    return await query(`SELECT 
        KONYV.ISBN as "ISBN",
        KONYV.NEV as "Név",
        KATEGORIA.NEV as "Kategória",
        KIADO.NEV as "Kiado",
        KONYV.OLDALSZAM as "Oldal",
        KONYV.AR as "Ár",
        KONYV.KEP as "Kép"
        FROM KONYV, KIADO, KATEGORIA
        WHERE
        KONYV.KIADO_ID = KIADO.ID AND
        KATEGORIA.ID = KONYV.KIADO_ID AND
        KONYV.ISBN = :isbn`, [isbn]);
}
