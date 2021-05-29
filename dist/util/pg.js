"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
exports.default = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeJS_Project',
    password: 'database',
    port: 5432
});
