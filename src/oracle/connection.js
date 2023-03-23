const oracledb = require('oracledb');
const Oracle = require("oracle-ssh");
const {createTunnel} = require("tunnel-ssh")

const serverOptions = {
	port: 22
};

const tunnelOptions = {
	autoClose:false
}

const sshOptions = {
	host: 'linux.inf.u-szeged.hu',//160.114.37.249
	port: 22,
	username: 'h159771',
	password: ''
};
console.log("elotte")
async function tunnel() {
    console.log("geci")
    let [server, conn] = await createTunnel(tunnelOptions, serverOptions, sshOptions);
    console.log("sldjkf");
    server.on('connection', (connection) => {
        console.log('new connection');
    });
    conn.on('error',(e)=>{
        console.log(e);
    });
}

async function run() {
    
    let connection;
    try{
        oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});
        connection = await oracledb.getConnection({
            user : 'C##KG009O',
            password : 'C##KG009O',
            connectionString : "ORANIADB"
        })
        const data = await connection.execute('SELECT * FROM C##KG009O.BOLT');
        console.log(data.rows);

    }catch(err){
        console.error(err)
    }
    console.log("geci")
}

async function init() {
    let connection;
    try {
        oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});
        connection = await Oracle.connect(
            {
                host: 'linux.inf.u-szeged.hu', // Your server host name
                port: 22, // Your server ssh port as default in ssh is 22
                user: 'h159771', // Your server username
                password: '' // Your server password
            },
            {
                host: "orania2.inf.u-szeged.hu",
                sid: "orania2", // Your database host in server as default is localhost
                port: 1521,
                user: "C##KG009O", // Your database user
                password: "C##KG009O", // Your database password
                database: "orania2", // Your database name
                
            }
        );
        // Now the pool is running, it can be used
        const sql = `SELECT sysdate FROM dual WHERE :b = 1`;
        const binds = [1];
        const options = {outFormat: oracledb.OUT_FORMAT_OBJECT};
        const result = await connection.client.execute(sql, binds, options);
        console.log(result);
 
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                throw err;
            }
        }
    }
}
init();
