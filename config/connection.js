//dependencies
require('dotenv').config();
const mysql = require('mysql');
const keys = require('../keys');

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: keys.sql.password,
        database: 'burgers_db'
    });
};


connection.connect((err) => {
    if (err) {
        console.error('connection error: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);

});

module.exports = connection;