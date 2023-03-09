# Étterem Projektterv 2022

## 1. Összefoglaló 

Ahhoz, hogy egy étterem elérhesse a teljes potenciálját elengedhetetlen, hogy legyen neki egy letisztul és igényes weboldal. Célunk ennek a weboldalnak a létrehozása. Egy felhasználóbarát rendelési felület, valamint az étterem számára használható raktárrendszerrel. Az étteremnek biztosítva egy könnyen kezelhető felület, amivel könnyen tudják változtatni a napi menüt, valamint a friss híreket. 


## 2. Verziók

| Verzió | Szerző(k)                | Dátum        | Státusz         | Megjegyzés                                                    |
|--------|--------------------------|--------------|-----------------|---------------------------------------------------------------|
|        |                          |              |                 |  -                                                            |


Státusz osztályozás:
 - Tervezet: befejezetlen dokumentum, a mérföldkő leadása előtti napokban
 - Előterjesztés: a projekt menedzser bírálatával, a mérföldkő határidejekor
 - Elfogadott: a megrendelő által elfogadva, a prezentáció bemutatásakor

## 3. A projekt bemutatása

Ez a projektterv az Étterem projektet mutatja be, mely 2022-09-13-tól 2022-11-27-ig tart. A projekt célja, hogy megfelelő felületet biztosítson a felhasználók, valamint az étteremben dolgozók számára, a rendelések és a raktárkészlet nyílvántartására. Mindezért egy egyszerűen használható, átlátható és hatékonyan működő webalkalmazás fog felelni. A projekten hét fő fejlesztő fog dolgozni, az elvégzett feladatokat pedig négy alkalommal fogjuk prezentálni a megrendelőnek.


### 3.1. Rendszerspecifikáció

A rendszernek képesnek kell lennie arra, hogy kezelni tudja a felhasználóktól beérkező rendeléseket, valamint egy egyszerűsített raktárrendszert az étterem számára. A weblapnak képesnek kell lennie arra, hogy egyszerűen változtatni lehessen a főoldal tartalmát.


### 3.2. Funkcionális követelmények 

 - Felhasználói munkamenet megvalósítása több jogosultsági szinttel (admin, felhasználó, dolgozó)
    Ki mire jogosult:
    - vendég:
        - Ételek megtekintése
        - Regisztráció
    - bejelentkezett felhasználó:
        - Saját adatainak változtatása
        - Saját profiljának a törlése
        - Tétel belehelyezése a kosárba
        - Rendelés leadása
        - Rendelés kifizetése 
	- dolgozó:
		- Kezeli a rendeléseket (törlés, szerkesztés)
		- Új rendelés felvétele
		- Rendelések megtekintése
		- Rendelések összesítése
        - Saját adatainak változtatása
        - Saját profiljának a törlése
        - Új áru hozzáadása
    - Admin:
        - mindenhez jogosult az előbbiek közül
        - Új étel hozzáadása
        - Ételek szerkesztése
        - Új áru hozzáadása
        - Értékelés törlése
        - Bármely felhasználó törlése (kivéve a sajátját)
        - Bármely felhasználó adatainak megváltoztatása (jelszó, felhasználónév, email...)
 - Felhasználók kezelése (CRUD)
    - Regisztráció:
        - A következő mezők lesznek (\*-al jelölt kötelező):
            - e-mail cím \*
            - felhasználónév (Csak alfanumerikus karakterek és \_) \*
            - jelszó \*
            - lakcím \*
            - Születési dátum \*
            - Nem (fiú, lány, egyéb)
            - Ételérzékenységek (glutén, laktóz, )
    - Bejelentkezés:
        - e-mail cím/felhasználónév
        - jelszó
    - Adatok módosítása:
        - jelszó módosítása
        - felhasználónév módosítása (egyedinek kell lennie)
        - lakcím módosítása
 - Készlet kezelése (CRUD)
        - Dolgozó, Admin:
            - Új termék hozzátétele
            - Készlet listázása
            - Készlet adatainak módósítása
 - Étterem értékelése
    - Bejelentkezett felhasználók:
        - Értékelhetik az éttermet 1 és 5 közötti értékkel
        - Szöveges részt is hagyhatnak egy értékelésnél
 - Lehetőség van keresésre étel neve alapján
    - Egy keresősávba karakterenként frissítve jelennek meg a találatok
 - Ételek szűrése allergének alapján
    - ki lehet választani, hogy milyen allergént tartalmazó ételeket ne jelenítsen meg
 - Megadott értékelések átlagolt kiírása
    - A rólunk oldal alján látszanak majd az értékelések
    - Ezt mindenki láthatja (vendég felhasználó is)
    - Vonzóbbá teszi az éttermet, ha más felhasználók jó értékeléseket hagynak
 - Biztonsági mentés automatikus létrehozása
 

### 3.3. Nem funkcionális követelmények

 - Reszponzív megjelenés
 - A kliens oldal platform- és böngészőfüggetlen legyen
 - Szenzitív adatokat biztonságosan tároljuk
 - A legfrissebb technológiákat használja a rendszer


## 4. Költség- és erőforrás-szükségletek

Az erőforrásigényünk összesen kb. 23 személynap/fő.

A rendelkezésünkre áll összesen 7 * 70 = 490 pont.


## 5. Szervezeti felépítés és felelősségmegosztás
A projekt megrendelője Dr. Pflanzner Tamás. Az Étterem projektet a projektcsapat fogja végrehajtani, amely jelenleg hét fejlesztőből áll. A csapatban csak pályakezdő webprogramozó található, senkinek nincsen tapasztalata ilyen téren.
 - Marosi Anna (<1 év tapasztalat)
 - Kis Balázs (<1 év tapasztalat)
 - Vizi Márk (<1 év tapasztalat)
 - Litavecz Máté (<1 év tapasztalat)
 - Wágner Réka (<1 év tapasztalat)
 - Sárközi Gergő (<1 év tapasztalat)
 - Ambrus Attila (<1 év tapasztalat)


### 5.1 Projektcsapat 
A projekt a következő emberekből áll:


| Személyek                                                        | Név                 | E-mail cím (stud-os)            |
|------------------------------------------------------------------|---------------------|---------------------------------|
| Megrendelő                                                       | Dr. Pflanzner Tamás | tamas.pflanzner@inf.u-szeged.hu |
| Projekt menedzser                                                | Ambrus Attila       | h142508@stud.u-szeged.hu        |
| Projekt tag                                                      | Marosi Anna         | h161395@stud.u-szeged.hu        |
| Projekt tag                                                      | Wágner Réka         | h881319@stud.u-szeged.hu        |
| Projekt tag                                                      | Kis Balázs          | h159771@stud.u-szeged.hu        |
| Projekt tag                                                      | Litavecz Máté       | h161070@stud.u-szeged.hu        |
| Projekt tag                                                      | Sárközi Gergő       | h164920@stud.u-szeged.hu        |
| Projekt tag                                                      | Vizi Márk           | h166218@stud.u-szeged.hu        |


## 6. A munka feltételei

### 6.1. Munkakörnyezet
A projekt a következő munkaállomásokat fogja használni a munka során:
 - Asus laptop(CPU: Ryzen 7 5800H, RAM: 16 GB, GPU: NVIDIA RTX 3060)
 - Asus laptop (CPU: i7 7500U, RAM: 16 GB)
 - Asus laptop (CPU: Ryzen 3700U, RAM: 8 GB, GPU: RADEON VEGA 8)
 - MacBook Air M1(CPU: Apple M1, RAM: 8 GB)
 - Asztali PC (CPU: i5 7500, RAM: 16GB, GPU: RADEON RX580)
 - Asztali PC (CPU: Ryzen FX 8300, RAM: 8 GB, GPU: RADEON R7)
 - HP laptop(CPU: i5 1035G1, RAM: 16 GB, GPU: NVIDIA MX130)

A projekt a következő technológiákat/szoftvereket fogja használni a munka során:
 - Node.js (backend)
 - Vue.js (frontend)
 - MySQL
 - Visual Studio Code
 - Git verziókövető (GitLab)


### 6.2. Rizikómenedzsment

| Kockázat                                    | Leírás                                                                                                                                                                                     | Valószínűség | Hatás  |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------|
| Betegség                                  | Súlyosságtól függően hátráltatja vagy bizonyos esetekben teljes mértékben korlátozza a munkavégzőt, így az egész projektre kihatással van. Megoldás: a feladatok átcsoportosítása        | nagy       | erős |
| Kommunikációs fennakadás a csapattagokkal | A csapattagok között nem elégséges az információ áramlás, nem pontosan, esetleg késve vagy nem egyértelműen tájékoztatjuk egymást. Megoldás: még gyakoribb megbeszélések és ellenőrzések | kis        | erős |
| Problémás időpont egyeztetés              | Mindenkinek nagyon különböző az órarendje, nehéz mindenki számára megfelelő időpontot találni. Megoldás: online meeting-ek    | nagy       | erős | 
| Ismeretlen technológiák használata		| A csapattagoknak olyan technológiákat/programozási nyelveket kell alkalmazniuk, amelyekkel még nem találkoztak korábban. Megoldás: utánanézni, tanulmányozni az adott platformokat, segítséget kérni a tapasztaltabbaktól | nagy		| erős |
| Megterhelő szorgalmi időszak				| A csapattagok nem tudnak elég időt szánni a projektre, mert más tárgyakra is sokat kell készülniük. Megoldás: időben elkezdeni a projektet, hogy jusson idő mindenre.		| nagy  | erős |

## 7. Jelentések

### 7.1. Munka menedzsment
A munkát Ambrus Attila koordinálja. Fő feladata, hogy folyamatosan egyeztessen a csapattagokkal az előrehaladásról és a fellépő problémákról, esetlegesen a megoldásban is segítséget nyújthat a projekt csúszásának elkerülése végett. További feladata a heti szinten tartandó csoportgyűlések időpontjának és helyszínének leszervezése, erről valamilyen formában tájékoztatja a projektcsapatot.


### 7.2. Csoportgyűlések

A projekt hetente ülésezik, hogy megvitassák az azt megelőző hét problémáit, illetve hogy megbeszéljék a következő hét feladatait. A megbeszélésről minden esetben memó készül.

1. megbeszélés:
 - Időpont: 2022.09.26.
 - Hely: online (Discord)
 - Résztvevők: mindenki
 - Érintett témák: Projektterv megírásának megbeszélése, feladatok kiosztása.

2. megbeszélés:
 - Időpont: 2022.09.28.
 - Hely: online (Discord)
 - Résztvevők: mindenki
 - Érintett témák: Specifikáció kifejtése, megírása.

3. megbeszélés:
 - Időpont: 2022.10.01.
 - Hely: online (Discord)
 - Résztvevők: mindenki
 - Érintett témák: Feladatlista megbeszélése, további feladatok kiosztása.

4. megbeszélés:
 - Időpont: 2022.10.31.
 - Hely: online (Discord)
 - Résztvevők: mindenki
 - Érintett témák: Feladatok megbeszélése, diagramok javítása.

5. megbeszélés:
 - Időpont: 2022.11.05.
 - Hely: online (Discord)
 - Résztvevők: mindenki
 - Érintett témák: Feladatok megbeszélése, kód átnézése, további módosítások átbeszélése.


### 7.3. Minőségbiztosítás

Az elkészült terveket a terveken nem dolgozó csapattársak közül átnézik, hogy megfelel-e a specifikációnak és az egyes diagramtípusok összhangban vannak-e egymással. A meglévő rendszerünk helyes működését a prototípusok bemutatása előtt a tesztelési dokumentumban leírtak végrehajtása alapján ellenőrizzük és összevetjük a specifikációval, hogy az elvárt eredményt kapjuk-e. További tesztelési lehetőségek: unit tesztek írása az egyes modulokhoz vagy a kód közös átnézése (code review) egy, a vizsgált modul programozásában nem résztvevő csapattaggal. Szoftverünk minőségét a végső leadás előtt javítani kell a rendszerünkre lefuttatott kódelemzés során kapott metrikaértékek és szabálysértések figyelembevételével.
Az alábbi lehetőségek vannak a szoftver megfelelő minőségének biztosítására:
- Specifikáció és tervek átnézése (kötelező)
- Teszttervek végrehajtása (kötelező)
- Unit tesztek írása (választható)
- Kód átnézése (választható)

### 7.4. Átadás, eredmények elfogadása

A projekt eredményeit dr. Flanzer Tamás fogja elfogadni. A projektterven változásokat csak dr. Flanzer Tamás írásos kérés esetén dr. Flanzer Tamás engedélyével lehet tenni. A projekt eredményesnek bizonyul, ha specifikáció helyes és határidőn belül készül el. Az esetleges késések pontlevonást eredményeznek.
Az elfogadás feltételeire és beadás formájára vonatkozó részletes leírás a következő honlapon olvasható: https://okt.inf.szte.hu/rf1/

### 7.5. Státuszjelentés

Minden leadásnál a projektmenedzser jelentést tesz a projekt haladásáról, és ha szükséges változásokat indítványoz a projektterven. Ezen kívül a megrendelő felszólítására a menedzser 3 munkanapon belül köteles leadni a jelentést. A gyakorlatvezetővel folytatott csapat megbeszéléseken a megadott sablon alapján emlékeztetőt készít a csapat, amit a következő megbeszélésen áttekintenek és felmérik az eredményeket és teendőket. Továbbá gazdálkodnak az erőforrásokkal és szükség esetén a megrendelővel egyeztetnek a projektterv módosításáról.

## 8. A munka tartalma

### 8.1. Tervezett szoftverfolyamat modell és architektúra

A szoftver fejlesztése során az agilis fejlesztési modellt alkalmazzuk. A fejlesztés során nagy hangsúlyt fektetünk a folyamatos kommunikációra. A fejlesztés során a szoftver specifikációi rugalmasan vátozhatnak, és ezzel a módszertannal tudunk a leggyorsabban alkalmazkodni az új elvárásokhoz.

A szoftver MVC alapú REST webszolgáltatásként működik. A szerver és a kliens függetlenek, csupán API végpontok segítségével kommunikálnak.


### 8.2. Átadandók és határidők 
A főbb átadandók és határidők a projekt időtartama alatt a következők:


| Szállítandó |                 Neve                |   Határideje  |
|:-----------:|:-----------------------------------:|:-------------:|
|      D1     |       Projektterv és útmutató       |  2022-10-11   |
|    P1+D2    | UML, DB, képernyőtervek és bemutató |  2022-10-25   |
|    P1+D3    |      Prototípus I. és bemutató      |  2022-11-15   |
|    P2+D4    |      Prototípus II. és bemutató     |  2022-11-29   |

```
D - dokumentáció, P - prototípus
```

## 9. Feladatlista

A következőkben a tervezett feladatok részletes összefoglalása található.

### 9.1. Projektterv (1. mérföldkő)

Ennek a feladatnak az a célja, hogy megvalósításhoz szükséges lépéseket, az ütemzést és a felelősöket meghatározzuk.

Részfeladatai a következők:

#### 9.1.1. Projektterv kitöltése

Felelős: Ambrus Attila

Tartam:  4 nap

Erőforrásigény:  1 személynap/fő


#### 9.1.2. Bemutató elkészítése

Felelős: Litavecz Máté

Tartam:  2 nap

Erőforrásigény:  1 személynap


### 9.2. UML és adatbázis tervek (2. mérföldkő)

Ennek a feladatnak az a célja, hogy a rendszerarchitektúrát, az adatbázist és webalkalmazás kinézetét megtervezzük.

Részfeladatai a következők:

#### 9.2.1. Use Case diagram

Felelős: Marosi Anna

Tartam:  4 nap

Erőforrásigény:  1 személynap

#### 9.2.2. Class diagram

Felelős: Ambrus Attila

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.2.3. Sequence diagram

Felelős: Wágner Réka

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.2.4. Egyed-kapcsolat diagram adatbázishoz

Felelős: Kis Balázs

Tartam:  4 nap

Erőforrásigény:  3 személynap

#### 9.2.5. Package diagram

Felelős: Vizi Márk

Tartam:  4 nap

Erőforrásigény:  1 személynap

#### 9.2.6. Képernyőtervek

Felelős: Sárközi Gergő

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.2.7. Bemutató elkészítése

Felelős: Marosi Anna

Tartam:  2 nap

Erőforrásigény:  1 személynap


### 9.3. Prototípus I. (3. mérföldkő) 

Ennek a feladatnak az a célja, hogy egy működő prototípust hozzunk létre, ahol az étterem funkcionális követelmények nagy része már prezentálható állapotban van.

Részfeladatai a következők:

#### 9.3.1.  Felhasználói munkamenet üzleti logikája több jogosultsági szinttel (admin, felhasználó, dolgozó)

Ez a rész, amikor le kell ellenőrizni, hogy be van-e jelentkezve a felhasználó, ha igen akkor kinek mit jelenítsen meg.

Felelős: Wágner Réka

Tartam:  5 nap

Erőforrásigény: 2 személynap

#### 9.3.2.  Felhasználói munkamenethez kapcsolódó GUI megvalósítása

Felelős: Sárközi Gergő

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.3.  Felhasználói munkamenethez szükséges adatok létrehozása az adatbázisban

Felelős: Litavecz Máté

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.4.  Felhasználók kezeléséhez tartozó üzleti logika (listázása, módosítása, létrehozása, törlése)

Felhasználók törlése az adatbázisból, valamint az adataik módosítása.

Felelős: Ambrus Attila 

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.5.  Felhasználók kezeléséhez kapcsolódó GUI megvalósítása

Felelős: Vizi Márk

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.6.  Rendelésekhez tartozó üzleti logika (listázása, módosítása, létrehozása, törlése)

Adatbázisból lekérés, törlés, státuszának módosítása.

Felelős: Kis Balázs

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.7.  Rendelés kezeléshez kapcsolódó GUI megvalósítása

Felelős: Litavecz Máté

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.8.  Rendeléshez szükséges adatok létrehozása az adatbázisban

Felelős: Marosi Anna

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.9.  Készlet kezeléséhez tartozó üzleti logika (listázása, módosítása, létrehozása, törlése)

Felelős: Wágner Réka

Tartam:  5 nap

Erőforrásigény:  2 személynap

#### 9.3.10.  Készletek kezeléshez kapcsolódó GUI megvalósítása

Felelős: Kis Balázs

Tartam:  5 nap

Erőforrásigény:  2 személynap

#### 9.3.11.  Készletek kezeléséhez szükséges adatok létrehozása az adatbázisban

Felelős: Vizi Márk

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.12.  Ételek kezeléséhez kapcsolódó üzleti logika (listázása, módosítása, létrehozása, törlése)

Felelős: Sárközi Gergő

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.13.  Ételek kezeléshez kapcsolódó GUI megvalósítása

Felelős: Ambrus Attila

Tartam:  5 nap

Erőforrásigény:  3 személynap

#### 9.3.14.  Ételek kezeléséhez szükséges adatok létrehozása az adatbázisban

Felelős: Wágner Réka

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.15.  Email-es kiértesítés új rendelés esetén az adott felhasználónak

Felelős: Vizi Márk

Tartam:  5 nap

Erőforrásigény:  2 személynap

#### 9.3.16.  Fuvar útvonalának megjelenítése térképen a kezdő és a végponttal együtt

Felelős: Litavecz Máté

Tartam:  3 nap

Erőforrásigény:  1 személynap

#### 9.3.17.  Visszajelzési űrlap a felhasználók számára (üzleti logika és GUI)

Felelős: Kis Balázs

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.18.  Biztonsági mentés automatikus létrehozása

Felelős: Sárközi Gergő

Tartam:  4 nap

Erőforrásigény:  2 személynap

#### 9.3.19. Tesztelési dokumentum (TP, TC)

Felelős: Marosi Anna

Tartam:  3 nap

Erőforrásigény:  1 személynap/fő


#### 9.3.20. Bemutató elkészítése 

Felelős: Ambrus Attila

Tartam:  2 nap

Erőforrásigény:  1 személynap


### 9.4. Prototípus II. (4. mérföldkő)

Ennek a feladatnak az a célja, hogy az előző mérföldkő hiányzó funkcióit pótoljuk, illetve a hibásan működő funkciókat és az esetlegesen felmerülő új funkciókat megvalósítsuk. Továbbá az alkalmazás alapos tesztelése is a mérföldkőben történik.

Részfeladatai a következők:

#### 9.4.1. Javított minőségű prototípus új funkciókkal

Felelős: Vizi Márk

Tartam:  5 nap

Erőforrásigény:  1 személynap

#### 9.4.2. Javított minőségű prototípus javított funkciókkal

Felelős: Wágner Réka

Tartam:  5 nap

Erőforrásigény:  2 személynap

#### 9.4.3. Javított minőségű prototípus a korábbi hiányzó funkciókkal

Felelős: Ambrus Attila

Tartam:  5 nap

Erőforrásigény:  2 személynap

#### 9.4.4. Felhasználói munkamenet tesztelése (TP, TC, TR)

Felelős: Kis Balázs

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.5. Rendelés kezelésének tesztelése (TP, TC, TR)

Felelős: Litavecz Máté

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.6. Készletek kezelésének tesztelése (TP, TC, TR)

Felelős: Marosi Anna

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.7. Ételek kezelésének tesztelése (TP, TC, TR)

Felelős: Sárközi Gergő

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.8. Email-es funkciók tesztelése (TP, TC, TR)

Felelős: Kis Balázs

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.9. Térképes funkciók tesztelése (TP, TC, TR)

Felelős: Litavecz Máté

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.10. Visszajelzési űrlap tesztelése (TP, TC, TR)

Felelős: Marosi Anna

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.11. Biztonsági mentés tesztelése (TP, TC, TR)

Felelős: Wágner Réka

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.12. Biztonsági aspektusok tesztelése

Felelős: Vizi Márk

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.13. Reszponzivitás tesztelése

Felelős: Ambrus Attila

Tartam:  1 nap

Erőforrásigény:  1 személynap

#### 9.4.14. Bemutató elkészítése 

Felelős: Sárközi Gergő

Tartam:  1 nap

Erőforrásigény:  1 személynap


## 10. Részletes időbeosztás

![image](./Gantt_diagram.png)



## 11. Projekt költségvetés

### 11.1. Részletes erőforrásigény (személynap)


|                     Név                    | 1. leadás - Projektterv | 2. leadás - UML és adatbázis | 3. leadás - Prototípus I. | 4. leadás - Prototípus II. | Összesen |
|:------------------------------------------:|:----------------------:|:--------------------------:|:-----------------------:|:------------------------:|:---------:|
|                     Ambrus Attila          |            2           |              3             |            6            |         3                |     14    |
|                     Marosi Anna            |            1           |              5             |            5            |         2                |     13    |
|                     Wágner Réka            |            1           |              3             |            5            |         4                |     13    |
|                     Kis Balázs             |            2           |              3             |            6            |         2                |     13    |
|                     Litavecz Máté          |            2           |              3             |            4            |         5                |     14    |
|                     Sárközi Gergő          |            1           |              4             |            6            |         2                |     13    |
|                     Vizi Márk              |            1           |              3             |            8            |         2                |     14    |


### 11.2. Részletes feladatszámok

|                     Név                    | 1. leadás - Projektterv | 2. leadás - UML és adatbázis | 3. leadás - Prototípus I. | 4. leadás - Prototípus II. | Összesen |
|:------------------------------------------:|:----------------------:|:--------------------------:|:-----------------------:|:------------------------:|:---------:|
|                     Ambrus Attila          |            2           |              2             |            4            |             2            |     10    |
|                     Marosi Anna            |            1           |              4             |            3            |             1            |     09    |
|                     Wágner Réka            |            1           |              2             |            3            |             4            |     10    |
|                     Kis Balázs             |            2           |              1             |            5            |             1            |     09    |
|                     Litavecz Máté          |            2           |              2             |            4            |             5            |     13    |
|                     Sárközi Gergő          |            1           |              3             |            3            |             2            |     09    |
|                     Vizi Márk              |            1           |              2             |            4            |             1            |     08    |

### 11.3. Részletes költségvetés

|                     Név                       | 1. leadás - Projektterv | 2. leadás - UML és adatbázis | 3. leadás - Prototípus I. | 4. leadás - Prototípus II. | Összesen |
|:---------------------------------------------:|:----------------------:|:--------------------------:|:-----------------------:|:------------------------:|:---------:|
|        Maximálisan választható pontszám %-ban |         10% (7)        |            30% (21)        |          50% (35)       |          30% (21)        | 100% (70) |
|                     Ambrus Attila             |            7           |              17            |           32            |             14           |     70    |
|                     Marosi Anna               |            6           |              21            |           30            |             13           |     70    |
|                     Wágner Réka               |            6           |              17            |           30            |             17           |     70    |
|                     Kis Balázs                |            7           |              18            |           32            |             13           |     70    |
|                     Litavecz Máté             |            7           |              18            |           24            |             21           |     70    |
|                     Sárközi Gergő             |            6           |              19            |           32            |             13           |     70    |
|                     Vizi Márk                 |            6           |              17            |           35            |             12           |     70    |

Szeged, 2022-10-09.
