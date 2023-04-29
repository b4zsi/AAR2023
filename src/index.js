const express = require("express");
const path = require("path");
const oracledb = require("oracledb");
const dbConfig = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

//const router = require("./controller/all.js");


const PORT = process.env.PORT || 8000;


app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views/assets")));
app.use(express.static(path.join(__dirname, "public/img")));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.urlencoded({ extended: false }));

require("./controller/routes.js")(app);
//app.use(router);

async function init() {
    await oracledb.createPool(dbConfig);

    app.listen(PORT, () => console.log('Server running at http://localhost:' + PORT));
}

init();