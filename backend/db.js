const mysql = require('mysql2');

// mysql connection
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cs4345'
}).promise();

module.exports = pool;
