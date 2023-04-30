const query = require("./common").query;

exports.getLastKepIndex = async () => {
    let res = await query(`select count(*) from konyv`)
    res = res['rows'][0][0]

    return res;
}

exports.uploadKonyv = async (nev, isbn, kiado, kategoria, oldalszam, mikor, kep, ar) => {
    return await query(`INSERT INTO konyv(nev, isbn, kiado_id, kategoria_id, oldalszam, mikor, kep, ar) 
    values(:nev, :isbn, :kiado_id, :kategoria_id, :oldalszam, to_date(:mikor, 'YYYY-MM-DD'), :kep, :ar)`,
        [nev, isbn, kiado, kategoria, oldalszam, mikor, kep, ar])
}

exports.uploadSzerzo = async (vezetek, kereszt) => {
    return await query(`INSERT INTO szerzo(vezeteknev, keresztnev) 
    values(:vez, :ker)`,
        [vezetek, kereszt])
}

exports.uploadKiado = async (nev) => {
    return await query(`INSERT INTO kiado(nev) 
    values(:nev)`,
        [nev])
}

exports.uploadKategoria = async (nev) => {
    return await query(`INSERT INTO kategoria(nev) 
    values(:nev)`,
        [nev])
}

exports.uploadBolt = async (iranyitoszam, telepules, utca, telefonszam, nyitvatartas) => {
    await query(`insert into bolt(telefonszam, utca, telepules, iranyitoszam) values(:telefonszam, :utca, :telepules, :irsz)`,
    [telefonszam, utca, telepules, iranyitoszam])

    let id = await query(`select id from bolt order by id desc fetch first 1 rows only`)
    id = id['rows'][0][0]

    let t = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    let counter = 0; 

    for(i of t){
        await query(`insert into nyitvatartas(bolt_id, nap, nyitas, zaras) values(:id, :nap, :nyitas, :zaras)`,
        [id, i, nyitvatartas[counter], nyitvatartas[counter + 1]])
        counter += 2;
    }

}
