const mysql = require('sql2');
require('dotenv').config();

const pool = mysql.createPool({
    host:sql5.freesqldatabase.com || process.env.DB_HOST,
    user:sql5823893 || process.env.DB_USER,
    password:P3bTWfNW99 || process.env.DB_PASSWORD,
    database: sql5823893 || process.env.DB_NAME,
    port:3306 || process.env.DB_PORT ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;