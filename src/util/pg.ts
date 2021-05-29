const Pool = require('pg').Pool
export default new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeJS_Project',
    password: 'database',
    port: 5432
});