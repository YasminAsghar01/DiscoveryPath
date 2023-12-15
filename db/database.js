const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'discoverypath',
  user: 'root',
  password: 'Database12!'
});

module.exports = pool;
