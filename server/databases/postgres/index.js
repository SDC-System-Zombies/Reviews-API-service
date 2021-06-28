const { Pool, Client } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: 'kathy',
  database: 'sdc'
});

pool.connect((err, res) => {
  console.log(err? err : 'Connected to Prostgres db')
});

module.exports = pool;