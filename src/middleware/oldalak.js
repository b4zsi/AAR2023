exports.oldalak = (req, res, next) => {
    res.locals.oldalak = {
        "konyv" : "Könyv",
        "fiok" : "Fiók",
        "szerzo" : "Szerző",
        "kiado" : "Kiadó",
        "kategoria" : "Kategória",
        "nyitvatartas" : "Nyitvatartás",
        "bolt" : "Bolt",
    }
    next()
}
