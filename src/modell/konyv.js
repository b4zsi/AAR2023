const query = require("./common").query;

exports.getKonyv = async () => {
    return await query(`SELECT 
        KONYV.ISBN as "ISBN",
        KONYV.NEV as "Név",
        KIADO.NEV as "Kiado",
        KATEGORIA.NEV as "Kategória",
        KONYV.OLDALSZAM as "Oldal",
        KONYV.AR as "Ár",
        to_char(KONYV.mikor, 'yyyy-mm-dd') as Mikor,
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
        KIADO.NEV as "Kiado",
        KATEGORIA.NEV as "Kategória",
        KONYV.OLDALSZAM as "Oldal",
        KONYV.AR as "Ár",
        to_char(KONYV.mikor, 'yyyy-mm-dd') as Mikor,
        KONYV.KEP as "Kép"
        FROM KONYV, KIADO, KATEGORIA
        WHERE
        KONYV.KIADO_ID = KIADO.ID AND
        KATEGORIA.ID = KONYV.KIADO_ID AND
        KONYV.ISBN = :isbn`, [isbn]);
}
