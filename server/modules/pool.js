const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
};

module.exports = new Pool(config);