const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const routeUser = require('./routes/route-users');
const routeWorker = require('./routes/route-workers');
const PORT = process.env.PORT || 80;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(routeUser);
app.use(routeWorker);
app.get('/db', (req,res) => {
    async function fetchData() {
        try{
            if (process.platform === 'darwin') {
                try {
                  initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});
                } catch (err) {
                  console.error('Whoops!');
                  console.error(err);
                  process.exit(1);
                }
              }
               const dbconnection = await OracleDB.getConnection({
                user: "C##KG009O",
                password: "C##KG009O",
                connectionString : "jdbc:oracle:thin:@orania2.inf.u-szeged.hu:1521:orania2"
              })

              const result = await dbconnection.execute("SELECT * FROM C##KG009O.ARUL");
              return result;
        }catch(error) {
            console.log(error);
        }
    }

    fetchData().then(dbRes => {
        res.send(dbRes);
    }).catch(err => {
        res.send(err);
    })
})

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:80/");
});
