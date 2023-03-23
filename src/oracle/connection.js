
import OracleDB, { initOracleClient } from 'oracledb';

const dbconnection = async() => {
    
    if (process.platform === 'darwin') {
        try {
          initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});
        } catch (err) {
          console.error('Whoops!');
          console.error(err);
          process.exit(1);
        }
      }
      dbconnection = await OracleDB.getConnection({
        user: "C##KG009O",
        password: "C##KG009O",
        connectionString : "jdbc:oracle:thin:@orania2.inf.u-szeged.hu:1521:orania2"
      })
      return await dbconnection.execute(`SELECT * FROM bolt`);
}
module.exports = dbconnection