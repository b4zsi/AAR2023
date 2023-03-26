const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = ""
oracledb.initOracleClient({configDir: '/opt/instantclient_19_8'});

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "C##M8KMOR",
      password      : mypw,
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=9999))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orania2)))"
    });

    const result = await connection.execute(
      `SELECT * FROM EMP`
    );
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
