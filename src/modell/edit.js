const query = require("./common").query;

exports.editKonyv = async (nev, isbn, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, kep) => {
    if(kep){

    await query(`update  konyv set nev = :nev, isbn = :isbn_uj, kiado_id = :kiado_id, kategoria_id = :kategoria_id, oldalszam = :oldalszam, mikor = to_date(:mikor, 'YYYY-MM-DD'), ar = :ar, kep = :kep where isbn = :isbn`,
        [nev, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, kep, isbn])
    }else{
    await query(`update  konyv set nev = :nev, isbn = :isbn_uj, kiado_id = :kiado_id, kategoria_id = :kategoria_id, oldalszam = :oldalszam, mikor = to_date(:mikor, 'YYYY-MM-DD'), ar = :ar where isbn = :isbn`,
        [nev, isbn_uj, kiado, kategoria, oldalszam, mikor, ar, isbn])

    }
}

exports.deleteKonyv = async (id) => {
    return await query(`delete from konyv where isbn = :id`,
        [id])
}

exports.editSzerzo = async (id, vez, ker) => {
    await query(`update szerzo set vezeteknev = :vez, keresztnev = :ker where id = :id`,[vez, ker, id]);

}

exports.deleteSzerzo = async (id) => {
    return await query(`delete from szerzo where id = :id`,
        [id])
}


exports.editKiado = async (id, nev) => {
    await query(`update kiado set nev = :nev where id = :id`,[nev, id]);

}

exports.deleteKiado = async (id) => {
    return await query(`delete from kiado where id = :id`,
        [id])
}

exports.editKategoria = async (id, nev) => {
    await query(`update kategoria set nev = :nev where id = :id`,[nev, id]);

}

exports.deleteKategoria = async (id) => {
    return await query(`delete from kategoria where id = :id`,
        [id])
}
