const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'doadmin',
    host: 'db-postgresql-fra1-57605-do-user-12723212-0.b.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'AVNS_YloF9AJaf6DEnKpDhts',
    port: 25060,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;