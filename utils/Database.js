const MySQL = require("mysql2");

const DBNAME = "hr_trackingDB";
const HOST = "localhost";
const PORT = 3306;
const PASS = "password";
const USER = "root";

const connection = MySQL.createConnection({
    host: HOST,

    // Your port; if not 3306
    port: PORT,

    // Your username
    user: USER,

    // Your password
    password: PASS,
    database: DBNAME
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log(`Connected to DB ${DBNAME} on ${HOST} Port ${PORT}`);
});

module.exports = connection;