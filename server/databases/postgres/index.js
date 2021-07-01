const { Pool, Client } = require('pg');

const pool = new Pool({
  host: 'localhost',
  hostname: 'ubuntu',
  user: process.env.DB_USER || 'postgres',
  password: 'woshiyuzhoumeishaonv!',
  database: 'sdc'
});

pool.connect((err, res) => {
  console.log(err? err : 'Connected to Prostgres db')
});

module.exports = pool;
