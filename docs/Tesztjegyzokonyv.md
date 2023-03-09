# Tesztjegyzőkönyv-Alapműveletek

Az alábbi tesztdokumentum az Étterem projekthez tartozó 9.3.12. Alapműveletek funkcióihoz készült. Felelőse: Marosi Anna

A tesztelési dokumentáció áttekinthetőségének érdekében egy jegyzőkönyv egy adott témához tartozó funkciókat tartalmazza 
(pl. vektorműveletek) és ne az adott projekttaghoz tartozó összes funkció tesztelését belesűrítve egy fájlba.

## 1. Teszteljárások (TP)

### 1.1. Bejelentkezés funkció tesztelése

- Azonosító: TP-01
- Tesztesetek: TC-01, TC-02
- Leírás: bejelentkezés funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a bejelentkezés funkciót
    2. lépés: Az EMAIL szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: Az JELSZÓ szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: Nyomjuk meg az $BEJELENTKEZÉS gombot 
    5. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: Bejelentkezett felhasználó, és az oldal átírányít a főoldalra, a menüsorban megjelenik a profil, kijelentkezés és a kosár fül, illetve a bejelentkezett felhasználó tud értékelést írni

### 1.2. Regisztráció funkció tesztelése

- Azonosító: TP-02
- Tesztesetek: TC-01, TC-02
- Leírás: regisztráció funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a regisztráció funkciót
    2. lépés: Az EMAIL szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: A FELHASZNÁLÓNÉV szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: A JELSZÓ szövegbeviteli mezőbe írjunk be a $TEXT3 szöveget
    5. lépés: Az LAKCÍM szövegbeviteli mezőbe írjunk be a $TEXT4 szöveget
    6. lépés: Az SZÜLETÉSI DÁTUM dátumbeviteli mezőbe írjunk be a $DATE1 dátumot
    7. lépés: Az NEM legördülőlistából kiválasztjuk a $OPTION1 lehetőséget
    8. lépés: Az ÉTELÉRZÉKENYSÉGEK jelölőnégyzetek közül kiválaszthatjuk a $INPUT1 és $INPUT2 lehetőségeket
    9. lépés: Nyomjuk meg a REGISZRÁLÁS gombot 
    10. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: Regisztrált felhasználó


### 1.3. Ételek hozzáadása funkció tesztelése

- Azonosító: TP-03
- Tesztesetek: TC-01, TC-02
- Leírás: ételek hozzáadása funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a ételek hozzáadása admin funkciót
    2. lépés: Az NÉV szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: Az LEÍRÁS szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: Az ÁR szövegbeviteli mezőbe írjunk be a $NUMBER1 számot
    5. lépés: Az KÉPNÉV szövegbeviteli mezőbe írjunk be a $TEXT3 szöveget
    6. lépés: Nyomjuk meg az $HOZZÁAD gombot 
    7. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban megjelenik az új étel, illetve felhasználó oldalán az étlap menüpont alatt is megjelenik az új étel

### 1.4. Ételek szerkesztése funkció tesztelése

- Azonosító: TP-04
- Tesztesetek: TC-01, TC-02
- Leírás: ételek szerkesztése funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a ételek szerkesztése admin funkciót
    2. lépés: Az NÉV szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: Az LEÍRÁS szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: Az ÁR szövegbeviteli mezőbe írjunk be a $NUMBER1 számot
    5. lépés: Az KÉPNÉV szövegbeviteli mezőbe írjunk be a $TEXT3 szöveget
    6. lépés: Nyomjuk meg az $FRÍSSIT gombot 
    7. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban módosul az étel, illetve felhasználó oldalán az étlap menüpont alatt is megjelenik a módosított étel


### 1.5. Áruk hozzáadása funkció tesztelése

- Azonosító: TP-05
- Tesztesetek: TC-01, TC-02
- Leírás: áruk hozzáadása funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a áruk hozzáadása admin funkciót
    2. lépés: Az NÉV szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: Az MENNYISÉG szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: Az HOL VAN TÁROLVA szövegbeviteli mezőbe írjunk be a $TEXT3 számot
    5. lépés: Nyomjuk meg az $HOZZÁAD gombot 
    6. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban megjelenik az új áru


### 1.6. Áruk szerkesztése funkció tesztelése

- Azonosító: TP-06
- Tesztesetek: TC-01, TC-02
- Leírás: áruk szerkesztése funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a áruk szerkesztése admin funkciót
    2. lépés: Az NÉV szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: Az MENNYISÉG szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: Az HOL VAN TÁROLVA szövegbeviteli mezőbe írjunk be a $TEXT3 számot
    5. lépés: Nyomjuk meg az $FRÍSSIT gombot 
    6. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban módosul az áru

### 1.7. Profil szerkesztése funkció tesztelése

- Azonosító: TP-07
- Tesztesetek: TC-01, TC-02
- Leírás: profil szerkesztése funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el a profil szerkesztése funkciót
    2. lépés: Az EMAIL szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    3. lépés: A JELSZÓ szövegbeviteli mezőbe írjunk be a $TEXT2 szöveget
    4. lépés: A FELHASZNÁLÓNÉV szövegbeviteli mezőbe írjunk be a $TEXT3 szöveget
    5. lépés: Az LAKCÍM szövegbeviteli mezőbe írjunk be a $TEXT4 szöveget
    6. lépés: Nyomjuk meg az $MÓDOSÍT gombot 
    7. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a profil oldalon a módosított adatok jelennek meg

### 1.8. Értékelés adása funkció tesztelése

- Azonosító: TP-08
- Tesztesetek: TC-01, TC-02
- Leírás: értékelés adása funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el az értékelés adása funkciót
    2. lépés: A CSILLAG legördülő mezőből kiválasztjuk a $NUMBER1 számot
    3. lépés: A LEÍRÁS szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    4. lépés: Nyomjuk meg az $HOZZÁAD gombot 
    5. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban megjelenik az értékelés


### 1.9. Értékelés szerkesztése funkció tesztelése

- Azonosító: TP-09
- Tesztesetek: TC-01, TC-02
- Leírás: értékelés adása funkció tesztelése
    1. lépés: Nyissuk meg az alkalmazást, és indítsuk el az értékelés adása funkciót
    2. lépés: A CSILLAG legördülő mezőből kiválasztjuk a $NUMBER1 számot
    3. lépés: A LEÍRÁS szövegbeviteli mezőbe írjunk be a $TEXT1 szöveget
    4. lépés: Nyomjuk meg az $HOZZÁAD gombot 
    5. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a táblázatban megjelenik az értékelés


## 2. Teszesetek (TC)


### 2.1. Bejelentkezés funkció tesztesetei

#### 2.1.1. TC-01

- TP: TP-01
- Leírás: bejelentkezés funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.hu ; $TEXT2 = proba1234
- Művelet: nyomjuk meg a BEJELENTKEZÉS gombot  
- Elvárt kimenet: Hiba üzenet: Hibás felhasználónév vagy jelszó

#### 2.1.2. TC-02

- TP: TP-01
- Leírás: bejelentkezés funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.hu ; $TEXT2 = Proba1234
- Művelet: nyomjuk meg a BEJELENTKEZÉS gombot 
- Elvárt kimenet: Bejelentkezett felhasználó, és az oldal átírányít a főoldalra, a menüsorban megjelenik a profil, kijelentkezés és a kosár fül, illetve a bejelentkezett felhasználó tud értékelést írni

### 2.2. Regisztráció funkció tesztesetei

#### 2.2.1. TC-01

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Regisztrált felhasználó

#### 2.2.2. TC-02

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = ""
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük töltse ki ezt a mezőt!

#### 2.2.3. TC-03

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba.hu
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük írjon egy "@" karaktert az email címbe. A(z) "proba.hu" címből hiányzik "@" jel.

#### 2.2.4. TC-04

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = ""
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük töltse ki ezt a mezőt!

#### 2.2.5. TC-05

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = ""
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük töltse ki ezt a mezőt!

#### 2.2.6. TC-06

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: A jelszónak legalább 8 karakter hosszúnak kell lennie és tartalmazni kell egy számot, illetve kis- és nagybetűt.


#### 2.2.7. TC-07

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = Proba Proba utca 1.
- Bemenet: $DATE1 = ""
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük töltse ki ezt a mezőt!


#### 2.2.8. TC-08

- TP: TP-02
- Leírás: regisztráció funkció tesztelése
- Bemenet: $TEXT1 = proba@proba.hu 
- Bemenet: $TEXT2 = proba
- Bemenet: $TEXT3 = Proba1234
- Bemenet: $TEXT4 = ""
- Bemenet: $DATE1 = 2000.01.01.
- Bemenet: $OPTION1 = Nő
- Bemenet: $INPUT1 = Laktózérzékeny
- Művelet: nyomjuk meg az Regisztrálás gombot 
- Elvárt kimenet: Kérjük töltse ki ezt a mezőt!


### 2.3. Új étel hozzáadás funkció tesztesetei

#### 2.3.1. TC-01

- TP: TP-03
- Leírás: új étel hozzáadás funkció tesztelése 
- Bemenet: $TEXT1 = Bolognai spagetti ; $TEXT2 = paradicsomszószos spagetti tészta zőldfűszerekkel és darált marhahússal ; $NUMBER1 = 3000 ; $TEXT3 = spagetti.jpg
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: a táblázatban megjelenik a Bolognai spagetti, illetve felhasználó oldalán az étlap menüpont alatt is megjelenik a Bolognai spagetti

### 2.4. Étel módosítása  funkció tesztesetei

#### 2.4.1. TC-01

- TP: TP-04
- Leírás:  Étel módosítása funkció tesztelése 
- Bemenet: $NUMBER1 = 3500 ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: a táblázatban megjelenik az étel új ára, illetve felhasználó oldalán az étlap menüpont alatt is megjelenik az étel új ára


### 2.5. Új áru hozzáadás funkció tesztesetei

#### 2.5.1. TC-01

- TP: TP-05
- Leírás: új áru hozzáadás funkció tesztelése 
- Bemenet: $TEXT1 = Liszt ; $TEXT2 = 50 db ; $TEXT3 = 2. polc 10. emelet
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: a táblázatban megjelenik a liszt


### 2.6. Áru módosítása  funkció tesztesetei

#### 2.6.1. TC-01

- TP: TP-06
- Leírás:  Áru módosítása funkció tesztelése 
- Bemenet: $TEXT2 = 20 db ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: a táblázatban módosul a liszt mennyisége




### 2.7. Profil módosítása  funkció tesztesetei

#### 2.7.1. TC-01

- TP: TP-07
- Leírás:  Profil módosítása funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.com ; 
- Bemenet: $TEXT2 = nem változtatjuk ; 
- Bemenet: $TEXT3 = nem változtatjuk ; 
- Bemenet: $TEXT4 = nem változtatjuk ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: a táblázatban módosul az email mező


#### 2.7.2. TC-02

- TP: TP-07
- Leírás:  Profil módosítása funkció tesztelése 
- Bemenet: $TEXT1 = proba ; 
- Bemenet: $TEXT2 = nem változtatjuk ; 
- Bemenet: $TEXT3 = nem változtatjuk ; 
- Bemenet: $TEXT4 = nem változtatjuk ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: Hibás e-mail formátum. Kérlek ebben a formában add meg: valami@valami.valami

#### 2.7.3. TC-03

- TP: TP-07
- Leírás:  Profil módosítása funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.com ; 
- Bemenet: $TEXT2 = proba ; 
- Bemenet: $TEXT3 = nem változtatjuk ; 
- Bemenet: $TEXT4 = nem változtatjuk ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: A jelszónak legalább 8 karakter hosszúnak kell lennie és tartalmazni kell egy számot, illetve kis- és nagybetűt

#### 2.7.4. TC-04

- TP: TP-07
- Leírás:  Profil módosítása funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.com ; 
- Bemenet: $TEXT2 = nem változtatjuk ; 
- Bemenet: $TEXT3 = "" ; 
- Bemenet: $TEXT4 = nem változtatjuk ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: Töltse ki ezt a mezőt

#### 2.7.5. TC-05

- TP: TP-07
- Leírás:  Profil módosítása funkció tesztelése 
- Bemenet: $TEXT1 = proba@proba.com ; 
- Bemenet: $TEXT2 = nem változtatjuk ; 
- Bemenet: $TEXT3 = nem változtatjuk ; 
- Bemenet: $TEXT4 = "" ; 
- Művelet: nyomjuk meg a FRISSÍT gombot  
- Elvárt kimenet: Töltse ki ezt a mezőt

### 2.8. Értékelés adása  funkció tesztesetei

#### 2.8.1. TC-01

- TP: TP-08
- Leírás:  Értékelés adása funkció tesztelése 
- Bemenet: $NUMBER1 = 5 ; 
- Bemenet: $TEXT1 = nagyon szuper hely ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: Megjelenik a táblázatban az értékelés


#### 2.8.2. TC-02

- TP: TP-08
- Leírás:  Értékelés adása funkció tesztelése 
- Bemenet: $NUMBER1 = nem írtam be semmit ; 
- Bemenet: $TEXT1 = nagyon szuper hely ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: Nem jelenik meg a táblázatban az értékelés

#### 2.8.3. TC-03

- TP: TP-08
- Leírás:  Értékelés adása funkció tesztelése 
- Bemenet: $NUMBER1 = 5 ; 
- Bemenet: $TEXT1 = nem írtam be semmit ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: Nem jelenik meg a táblázatban az értékelés

### 2.9. Értékelés módosítása  funkció tesztesetei

#### 2.9.1. TC-01

- TP: TP-09
- Leírás:  Értékelés módosítása funkció tesztelése 
- Bemenet: $NUMBER1 = 4 ; 
- Bemenet: $TEXT1 = nem változtattam semmit ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: Megjelenik a módosított értékelés a táblázatban 

#### 2.9.2. TC-02

- TP: TP-09
- Leírás:  Értékelés módosítása funkció tesztelése 
- Bemenet: $NUMBER1 = üresen hagytam ; 
- Bemenet: $TEXT1 = nem változtattam semmit ; 
- Művelet: nyomjuk meg a HOZZÁAD gombot  
- Elvárt kimenet: Nem jelenik meg a módosított értékelés a táblázatban 


## 3. Tesztriportok  (TR)

### 3.1 Bejelentkezés funkció tesztriportjai

#### 3.1.1. TR-01 (TC-01)
- TP: TP-01
    1. lépés: proba@proba.hu-t beírtam
    2. lépés: proba1234-t beírtam 
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (HIBA)


#### 3.1.2. TR-02 (TC-02)
- TP: TP-01
    1. lépés: proba@proba.hu-t beírtam
    2. lépés: Proba1234-t beírtam 
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (bejelentkezett felhasználó)


### 3.2 Regisztráció funkció tesztriportjai

#### 3.2.1. TR-01 (TC-01)
- TP: TP-02
    1. lépés: proba@proba.hu-t beírtam
    2. lépés: proba-t beírtam 
    3. lépés: Proba1234-t beírtam 
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Regisztrált felhasználó)


#### 3.2.2. TR-02 (TC-02)
- TP: TP-02
    1. lépés: nem írtam be semmit
    2. lépés: proba-t beírtam 
    3. lépés: Proba1234-t beírtam 
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)

#### 3.2.3. TR-03 (TC-03)
- TP: TP-02
    1. lépés: proba.hu-t beírtam
    2. lépés: proba-t beírtam 
    3. lépés: Proba1234-t beírtam 
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)


#### 3.2.4. TR-04 (TC-04)
- TP: TP-02
    1. lépés: proba@proba.hu -t beírtam
    2. lépés: nem írtam be semmit
    3. lépés: Proba1234
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)


#### 3.2.5. TR-05 (TC-05)
- TP: TP-02
    1. lépés: proba@proba.hu -t beírtam
    2. lépés: proba
    3. lépés: nem írtam be semmit 
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)

#### 3.2.6. TR-06 (TC-06)
- TP: TP-02
    1. lépés: proba@proba.hu -t beírtam
    2. lépés: proba
    3. lépés: proba1234
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)

#### 3.2.7. TR-07 (TC-07)
- TP: TP-02
    1. lépés: proba@proba.hu -t beírtam
    2. lépés: proba
    3. lépés: proba1234
    4. lépés: Proba Proba utca 1.-t beírtam 
    5. lépés: nem írtam be semmit
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)

#### 3.2.7. TR-07 (TC-07)
- TP: TP-02
    1. lépés: proba@proba.hu -t beírtam
    2. lépés: proba
    3. lépés: proba1234
    4. lépés: nem írtam be semmit
    5. lépés: 2000.01.01.-t beírtam 
    6. lépés: Nő-t beírtam 
    7. lépés: Laktózérzékeny-t beírtam 
    8. lépés: a gomb egyszeri megnyomás után inaktív lett
    9. lépés: helyes eredményt kaptam (Hiba)


### 3.3 Új étel hozzáadás funkció tesztriportjai

#### 3.3.1. TR-01 (TC-01)
- TP: TP-03
    1. lépés: Bolognai spagetti-t beírtam
    2. lépés:  paradicsomszószos spagetti tészta zőldfűszerekkel és darált marhahússal-t beírtam 
    3. lépés: 3000-t beírtam 
    4. lépés: spagetti.jpg-t beírtam 
    5. lépés: a gomb egyszeri megnyomás után inaktív lett
    6. lépés: helyes eredményt kaptam (elmentett étel)



### 3.4  Étel módosítása funkció tesztriportjai

#### 3.4.1. TR-01 (TC-01)
- TP: TP-04
    1. lépés: 3500-t átírtam 
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (módosított étel)


### 3.5  Új áru hozzáadás funkció tesztriportjai

#### 3.5.1. TR-01 (TC-01)
- TP: TP-05
    1. lépés: Liszt-t beírtam
    2. lépés: 50 db-t beírtam 
    3. lépés: 2. polc 10. emelet-t beírtam 
    4. lépés: a gomb egyszeri megnyomás után inaktív lett
    5. lépés: helyes eredményt kaptam (új áru)


### 3.6  Áru módosítása funkció tesztriportjai

#### 3.6.1. TR-01 (TC-01)
- TP: TP-06
    1. lépés: 20 db-t beírtam
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (módosított áru)



### 3.7  Profil módosítása funkció tesztriportjai

#### 3.7.1. TR-01 (TC-01)
- TP: TP-07
    1. lépés: proba@proba.com -t beírtam
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (módosított email)

#### 3.7.2. TR-02 (TC-02)
- TP: TP-07
    1. lépés: proba -t beírtam az email helyére
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (hiba)


#### 3.7.3. TR-03 (TC-03)
- TP: TP-07
    1. lépés: proba-t beírtam a jelszó helyére
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (hiba)


#### 3.7.4. TR-04 (TC-04)
- TP: TP-07
    1. lépés: kitöröltem a felhasználónevet és üresen hagytam
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (hiba)

#### 3.7.5. TR-05 (TC-05)
- TP: TP-07
    1. lépés: kitöröltem a telefonszámot és üresen hagytam
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (hiba)


#### 3.7.6. TR-06 (TC-06)
- TP: TP-07
    1. lépés: kitöröltem a lakcímet és üresen hagytam
    2. lépés: a gomb egyszeri megnyomás után inaktív lett
    3. lépés: helyes eredményt kaptam (hiba)



### 3.8  Értékelések adása funkció tesztriportjai

#### 3.8.1. TR-01 (TC-01)
- TP: TP-08
    1. lépés: 5-öst választottam a számok közül
    2. lépés: nagyon szép hely-et írtam a szövegmezőbe
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (elmentett értékelés)

#### 3.8.2. TR-02 (TC-02)
- TP: TP-08
    1. lépés: nem választottam semmit
    2. lépés: nagyon szép hely-et írtam a szövegmezőbe
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (hiba)

#### 3.8.3. TR-03 (TC-03)
- TP: TP-08
    1. lépés: 5-öst választottam a számok közül
    2. lépés: nem írtam be semmit
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (hiba)

### 3.9  Értékelések módosítása funkció tesztriportjai

#### 3.9.1. TR-01 (TC-01)
- TP: TP-09
    1. lépés: 5-öst átírtam 4esre
    2. lépés: nem változtattam semmit
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (elmentett értékelés)

#### 3.9.2. TR-02 (TC-02)
- TP: TP-09
    1. lépés: üresen hagytam
    2. lépés: nem változtattam semmit
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (hiba)































