--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: arukeszlet; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.arukeszlet (
    id integer NOT NULL,
    nev text NOT NULL,
    mennyiseg integer NOT NULL,
    holvantarolva text NOT NULL
);


ALTER TABLE public.arukeszlet OWNER TO doadmin;

--
-- Name: arukeszlet_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.arukeszlet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arukeszlet_id_seq OWNER TO doadmin;

--
-- Name: arukeszlet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.arukeszlet_id_seq OWNED BY public.arukeszlet.id;


--
-- Name: ertekelesek; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.ertekelesek (
    id integer NOT NULL,
    user_id integer NOT NULL,
    csillag integer NOT NULL,
    leiras text NOT NULL
);


ALTER TABLE public.ertekelesek OWNER TO doadmin;

--
-- Name: ertekelesek_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.ertekelesek_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ertekelesek_id_seq OWNER TO doadmin;

--
-- Name: ertekelesek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.ertekelesek_id_seq OWNED BY public.ertekelesek.id;


--
-- Name: erzekeny; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.erzekeny (
    userid integer NOT NULL,
    erzekenysegid integer NOT NULL
);


ALTER TABLE public.erzekeny OWNER TO doadmin;

--
-- Name: erzekeny_erzekenysegid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.erzekeny_erzekenysegid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.erzekeny_erzekenysegid_seq OWNER TO doadmin;

--
-- Name: erzekeny_erzekenysegid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.erzekeny_erzekenysegid_seq OWNED BY public.erzekeny.erzekenysegid;


--
-- Name: erzekeny_userid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.erzekeny_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.erzekeny_userid_seq OWNER TO doadmin;

--
-- Name: erzekeny_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.erzekeny_userid_seq OWNED BY public.erzekeny.userid;


--
-- Name: erzekenysegek; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.erzekenysegek (
    id integer NOT NULL,
    erzekenyseg character varying(100) NOT NULL
);


ALTER TABLE public.erzekenysegek OWNER TO doadmin;

--
-- Name: erzekenysegek_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.erzekenysegek_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.erzekenysegek_id_seq OWNER TO doadmin;

--
-- Name: erzekenysegek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.erzekenysegek_id_seq OWNED BY public.erzekenysegek.id;


--
-- Name: etelek; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.etelek (
    id integer NOT NULL,
    nev text NOT NULL,
    leiras text NOT NULL,
    kepnev text NOT NULL,
    ar integer NOT NULL
);


ALTER TABLE public.etelek OWNER TO doadmin;

--
-- Name: etelek_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.etelek_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.etelek_id_seq OWNER TO doadmin;

--
-- Name: etelek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.etelek_id_seq OWNED BY public.etelek.id;


--
-- Name: kosar; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.kosar (
    userid integer NOT NULL,
    etelid integer NOT NULL,
    mennyiseg integer NOT NULL
);


ALTER TABLE public.kosar OWNER TO doadmin;

--
-- Name: kosar_etelid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.kosar_etelid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kosar_etelid_seq OWNER TO doadmin;

--
-- Name: kosar_etelid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.kosar_etelid_seq OWNED BY public.kosar.etelid;


--
-- Name: kosar_userid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.kosar_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kosar_userid_seq OWNER TO doadmin;

--
-- Name: kosar_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.kosar_userid_seq OWNED BY public.kosar.userid;


--
-- Name: mentes; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.mentes (
    erzekenysegid integer NOT NULL,
    etelid integer NOT NULL
);


ALTER TABLE public.mentes OWNER TO doadmin;

--
-- Name: mentes_erzekenysegid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.mentes_erzekenysegid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mentes_erzekenysegid_seq OWNER TO doadmin;

--
-- Name: mentes_erzekenysegid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.mentes_erzekenysegid_seq OWNED BY public.mentes.erzekenysegid;


--
-- Name: mentes_etelid_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.mentes_etelid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mentes_etelid_seq OWNER TO doadmin;

--
-- Name: mentes_etelid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.mentes_etelid_seq OWNED BY public.mentes.etelid;


--
-- Name: rendeles; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.rendeles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    idopont timestamp without time zone NOT NULL,
    ar integer NOT NULL
);


ALTER TABLE public.rendeles OWNER TO doadmin;

--
-- Name: rendeles_etel; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.rendeles_etel (
    id integer NOT NULL,
    rendeles_id integer NOT NULL,
    etel_id integer NOT NULL,
    mennyiseg integer
);


ALTER TABLE public.rendeles_etel OWNER TO doadmin;

--
-- Name: rendeles_etel_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.rendeles_etel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rendeles_etel_id_seq OWNER TO doadmin;

--
-- Name: rendeles_etel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.rendeles_etel_id_seq OWNED BY public.rendeles_etel.id;


--
-- Name: rendeles_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.rendeles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rendeles_id_seq OWNER TO doadmin;

--
-- Name: rendeles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.rendeles_id_seq OWNED BY public.rendeles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(200) NOT NULL,
    role character varying(100) DEFAULT 'ROLE_USER'::character varying NOT NULL,
    felhnev character varying(100) NOT NULL,
    address character varying(200) NOT NULL,
    tel character varying(20),
    nem character varying(15)
);


ALTER TABLE public.users OWNER TO doadmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO doadmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: arukeszlet id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.arukeszlet ALTER COLUMN id SET DEFAULT nextval('public.arukeszlet_id_seq'::regclass);


--
-- Name: ertekelesek id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.ertekelesek ALTER COLUMN id SET DEFAULT nextval('public.ertekelesek_id_seq'::regclass);


--
-- Name: erzekeny userid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekeny ALTER COLUMN userid SET DEFAULT nextval('public.erzekeny_userid_seq'::regclass);


--
-- Name: erzekeny erzekenysegid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekeny ALTER COLUMN erzekenysegid SET DEFAULT nextval('public.erzekeny_erzekenysegid_seq'::regclass);


--
-- Name: erzekenysegek id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekenysegek ALTER COLUMN id SET DEFAULT nextval('public.erzekenysegek_id_seq'::regclass);


--
-- Name: etelek id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.etelek ALTER COLUMN id SET DEFAULT nextval('public.etelek_id_seq'::regclass);


--
-- Name: kosar userid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.kosar ALTER COLUMN userid SET DEFAULT nextval('public.kosar_userid_seq'::regclass);


--
-- Name: kosar etelid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.kosar ALTER COLUMN etelid SET DEFAULT nextval('public.kosar_etelid_seq'::regclass);


--
-- Name: mentes erzekenysegid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.mentes ALTER COLUMN erzekenysegid SET DEFAULT nextval('public.mentes_erzekenysegid_seq'::regclass);


--
-- Name: mentes etelid; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.mentes ALTER COLUMN etelid SET DEFAULT nextval('public.mentes_etelid_seq'::regclass);


--
-- Name: rendeles id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles ALTER COLUMN id SET DEFAULT nextval('public.rendeles_id_seq'::regclass);


--
-- Name: rendeles_etel id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles_etel ALTER COLUMN id SET DEFAULT nextval('public.rendeles_etel_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: arukeszlet; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.arukeszlet (id, nev, mennyiseg, holvantarolva) FROM stdin;
1	Liszt	20	1. polc 1.
2	Élesztő	40	Hűtő, 1. szekrény
3	Tészta	30	1. polc 2.
9	Paprika	19	1. polc 4.
8	Mozarella	16	Hűtő, 1.szekrény
5	Marhahús	24	Fagyasztó
7	Paradicsom	36	Hűtő, 2.szekrény
10	Sonka	28	Hűtő, 2.szekrény
6	Kenyér	14	1. polc 3.
11	Csirkemell	34	Fagyasztó
12	Saláta	13	Hűtő, 3.szekrény
13	Uborka	17	Hűtő, 3.szekrény
4	Sertéshús	22	Fagyasztó
30	Kukorica	17	Hűtő, 7.szekrény
29	Barna rizs	27	3. polc 4.
15	Karfiol	23	2. polc 1.
22	Saláta	25	Hűtő, 5.szekrény
26	Szegfű	6	3. polc 1.
20	Joghurt	15	Hűtő, 4.szekrény
19	Sárgarépa	21	2. polc 4.
17	Tejföl	20	Hűtő, 4.szekrény
28	Oregánó	19	3. polc 3.
27	Majoranna	14	3. polc 2.
24	Meggy	17	Hűtő, 6.szekrény
25	Cseresznye	16	Hűtő, 6.szekrény
23	Káposzta	13	Hűtő, 5.szekrény
21	Burgonya	30	2. polc 5.
18	Zeller	23	2. polc 3.
14	Petrezselyem	15	1. polc 5.
16	Vöröshagyma	18	2. polc 2.
31	Kolbász	16	3. polc 5.
\.


--
-- Data for Name: ertekelesek; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.ertekelesek (id, user_id, csillag, leiras) FROM stdin;
1	1	3	Good
6	75	5	Fullos!
8	114	5	WOW
7	131	1	xdddddd
15	113	4	
16	135	5	Legjobb
\.


--
-- Data for Name: erzekeny; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.erzekeny (userid, erzekenysegid) FROM stdin;
109	1
109	2
113	1
130	2
\.


--
-- Data for Name: erzekenysegek; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.erzekenysegek (id, erzekenyseg) FROM stdin;
1	Laktóz
2	Glutén
\.


--
-- Data for Name: etelek; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.etelek (id, nev, leiras, kepnev, ar) FROM stdin;
8	Bolognai spagetti	Sertéshúsos és marhahúsos ragu, spagetti tészta kolbász darabkákkal	spagetti.jpg	1250
20	Lasagne	Darált sertéshúsos és marhahúsos ragu mozzarellával	lasagne.jpg	1900
21	Cézár saláta	Paprika, paradicsom, saláta, uborka, csirkemell csíkok, pirított kenyérkocka sajttal megszórva	cezar.jpg	1100
34	Gulyásleves	Marhahús, burgonya, vöröshagyma, fűszerpaprika, paradicsom, petrezselyem, zeller és sárgarépa	gulyasleves.jpeg	750
35	Paradicsomleves	Paradicsom, vöröshagyma, paprika és betűtészta	paradicsomleves.jpg	750
36	Káposztás tészta	Káposzta, vöröshagyma és kockatészta	kaposztas_teszta.jpg	1000
37	Chilis bab	Sertéshús, vöröshagyma, paradicsomlé, kukorica, vörösbab, majoranna, oregánó, petrezselyem	chilis_bab.jpg	1150
38	Rakott karfiol	Sertéshús, karfiol, reszelt sajt, barna rizs, tejföl	rakott_karfiol.jpg	1300
39	Tejfölös-sajtos csirkemell	Csirkemell, tejföl, sajt, fűszerpaprika, petrezselyem	tejfolos_sajtos_csirkemell.jpeg	1500
4	Pizza	Paradicsomszósz, sonka, mozzarella sajt	pizza01.jpg	1900
33	Gyümölcsleves	Meggy, cseresznye, joghurt és szegfű által készített mennyei leves	gyumolcsleves.jpg	800
19	Pestos tészta	Pestos spagetti tészta sajttal megszórva	pestos.jpg	1500
\.


--
-- Data for Name: kosar; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.kosar (userid, etelid, mennyiseg) FROM stdin;
114	4	1
75	20	3
75	21	1
131	20	1
131	21	1
113	4	2
115	4	1
115	19	1
113	19	1
113	8	3
130	20	2
\.


--
-- Data for Name: mentes; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.mentes (erzekenysegid, etelid) FROM stdin;
2	33
1	8
1	34
1	35
1	36
2	37
2	38
2	39
\.


--
-- Data for Name: rendeles; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.rendeles (id, user_id, idopont, ar) FROM stdin;
4	135	2022-12-04 21:50:21.006134	12750
6	135	2022-12-05 06:06:14.22613	5250
\.


--
-- Data for Name: rendeles_etel; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.rendeles_etel (id, rendeles_id, etel_id, mennyiseg) FROM stdin;
3	4	20	3
4	4	21	3
6	4	4	3
7	6	4	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: doadmin
--

COPY public.users (id, email, password, role, felhnev, address, tel, nem) FROM stdin;
131	patrik.szilagyi@gmail.com	$2a$10$0f9t93yuythJrkwqbfWJQO8Isf9mPuWdk9l9WsNw/pyXg2aGcFcKi	ROLE_USER	nagyharcos9483	2800 Tatabánya, Katalin sor 30.	36486891950	man
115	hortobagyikata2003@gmail.com	$2a$10$O7UAbVapdsq7eXbjl592MuUQzna6Ng5P41un6aggF3uNCDUJ5TCCW	ROLE_USER	kata	5900 Orosháza, Aradi utca 6.	06301789365	woman
1	admin@admin.com	$2a$10$o8Q.EiJEFOyNRCuWBV0Or.hWbIl3HtKU/qDYzKSEjr6jbU0nBnAlu	ROLE_ADMIN	admin	admin	06301234567	other
73	bazsyhun@gmail.com	$2a$10$TBcj72HwiH2LgTTkBqXRiO0xGpEgsud.ImaO4rvxfk6OLPtVOZnO.	ROLE_ADMIN	bazsi	xddd	06301234567	man
109	srkzgrg@outlook.com	$2a$10$CY9UBxJER1X4IBTkZDon8ezNnS722BguRSyHOX4duqjhWer7djRVK	ROLE_ADMIN	srkzgrg	5900, Orosháza Valami utca 2.	06301234567	man
128	vaslabas44@gmail.com	$2a$10$xp9MBHh6.oeAJrUNOfbFtOk/vv3rXs1KR5qZyA4.lfAMNTJFgmnIa	ROLE_USER	florass	5600 Békéscsaba, Takács határsor 34.	36960836557	man
113	evelin.horvath@gmail.com	$2a$10$WXtGv4J4NgClsKeB9eIoHOyE1ah3p02mh66qFexH7e8mko6uHVhQe	ROLE_USER	evelinath	7600 Pécs, Kristóf sor 34.	36301928642	woman
75	attila.ambrus0022@gmail.com	$2a$10$n1FOFNJBSsDEZrKiQr4a0OuWiBukU2uNGguuJUFgz3SXSi7LKO7Hi	ROLE_USER	hulu	8511 Pápa, Orbán liget 55.	06301234567	man
114	katongab984@yahoo.com	$2a$10$V5FiA/vgvR/m.h45JPZUuuxwbRvrP7M1tgYJDaG1I5or590wShsvG	ROLE_USER	gabrona	8904 Zalaegerszeg, Richárd lépcső 17.	06309265835	man
135	test@gmail.com	$2a$10$e4azqVzyJ1Qk4ZYD3OPi0O8G3goBgdHR1wlNNIJ6MnYfyAK.CnNFC	ROLE_USER	test	2035 Érd, Barna árok 6.	06303987465	man
136	veres.maja64@gmail.com	$2a$10$nGnC1OTfUvwZwqWt20NLkefmawg8UFiFjLTbGF0/CBldoRUCVh2NG	ROLE_USER	majalis88	1028 Budapest, Barna körönd 1.	06303467942	man
74	aronnovak34@freemail.hu	$2a$10$hi7/JYjvfNUXXYLa/xwNwOg.cgBvsFEVAouH1jBIl6rJ6FVdYTrBe	ROLE_USER	aronnvak	1106 Budapest, Endre sétaút 85.	06302394678	man
127	angyalka872@freemail.hu	$2a$10$xOWvIftjVXnZRbrra9F8g.NxVWBc.B5RpAtRpJkvBJ79yoj3R9mf.	ROLE_USER	angeldai	1210 Budapest, Ernő gát 21.	06205694249	man
129	hegedus.erno@gmail.com	$2a$10$Hcy2ipESfwcsbap6b0NB8uXnzqk0h9R9FE8bK2ZiYSeIkalGxVsSO	ROLE_USER	hegeduser	8904 Zalaegerszeg, Sándor útja 55.	36616768193	man
130	xd@xd.hu	$2a$10$D3ZKhn2saOcc7dxzJyRjVO.FLr.p1.Y.Wi/2MwB9D/tMELHlQt03.	ROLE_USER	bazsi	Call Me	06202915840	man
\.


--
-- Name: arukeszlet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.arukeszlet_id_seq', 51, true);


--
-- Name: ertekelesek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.ertekelesek_id_seq', 16, true);


--
-- Name: erzekeny_erzekenysegid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.erzekeny_erzekenysegid_seq', 1, false);


--
-- Name: erzekeny_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.erzekeny_userid_seq', 1, false);


--
-- Name: erzekenysegek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.erzekenysegek_id_seq', 1, false);


--
-- Name: etelek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.etelek_id_seq', 39, true);


--
-- Name: kosar_etelid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.kosar_etelid_seq', 1, false);


--
-- Name: kosar_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.kosar_userid_seq', 1, false);


--
-- Name: mentes_erzekenysegid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.mentes_erzekenysegid_seq', 1, false);


--
-- Name: mentes_etelid_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.mentes_etelid_seq', 1, false);


--
-- Name: rendeles_etel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.rendeles_etel_id_seq', 7, true);


--
-- Name: rendeles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.rendeles_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.users_id_seq', 136, true);


--
-- Name: arukeszlet arukeszlet_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.arukeszlet
    ADD CONSTRAINT arukeszlet_pkey PRIMARY KEY (id);


--
-- Name: ertekelesek ertekelesek_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.ertekelesek
    ADD CONSTRAINT ertekelesek_pkey PRIMARY KEY (id);


--
-- Name: erzekeny erzekeny_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekeny
    ADD CONSTRAINT erzekeny_pkey PRIMARY KEY (userid, erzekenysegid);


--
-- Name: erzekenysegek erzekenysegek_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekenysegek
    ADD CONSTRAINT erzekenysegek_pkey PRIMARY KEY (id);


--
-- Name: etelek etelek_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.etelek
    ADD CONSTRAINT etelek_pkey PRIMARY KEY (id);


--
-- Name: kosar kosar_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.kosar
    ADD CONSTRAINT kosar_pkey PRIMARY KEY (userid, etelid);


--
-- Name: mentes mentes_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.mentes
    ADD CONSTRAINT mentes_pkey PRIMARY KEY (erzekenysegid, etelid);


--
-- Name: rendeles_etel rendeles_etel_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles_etel
    ADD CONSTRAINT rendeles_etel_pkey PRIMARY KEY (id);


--
-- Name: rendeles rendeles_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles
    ADD CONSTRAINT rendeles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: erzekeny erzekeny_erzekenysegid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekeny
    ADD CONSTRAINT erzekeny_erzekenysegid_fkey FOREIGN KEY (erzekenysegid) REFERENCES public.erzekenysegek(id);


--
-- Name: erzekeny erzekeny_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.erzekeny
    ADD CONSTRAINT erzekeny_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- Name: kosar kosar_etelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.kosar
    ADD CONSTRAINT kosar_etelid_fkey FOREIGN KEY (etelid) REFERENCES public.etelek(id);


--
-- Name: kosar kosar_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.kosar
    ADD CONSTRAINT kosar_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- Name: mentes mentes_erzekenysegid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.mentes
    ADD CONSTRAINT mentes_erzekenysegid_fkey FOREIGN KEY (erzekenysegid) REFERENCES public.erzekenysegek(id);


--
-- Name: mentes mentes_etelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.mentes
    ADD CONSTRAINT mentes_etelid_fkey FOREIGN KEY (etelid) REFERENCES public.etelek(id);


--
-- Name: rendeles_etel rendeles_etel_etel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles_etel
    ADD CONSTRAINT rendeles_etel_etel_id_fkey FOREIGN KEY (etel_id) REFERENCES public.etelek(id);


--
-- Name: rendeles_etel rendeles_etel_rendeles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles_etel
    ADD CONSTRAINT rendeles_etel_rendeles_id_fkey FOREIGN KEY (rendeles_id) REFERENCES public.rendeles(id);


--
-- Name: rendeles rendeles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.rendeles
    ADD CONSTRAINT rendeles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

