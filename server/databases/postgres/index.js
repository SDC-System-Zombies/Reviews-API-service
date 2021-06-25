const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'kathy',
  database: 'sdc'
});

pool.connect((err, res) => {
  console.log(err? err : 'Connected to Prostgres db')
});

// pool.query('select * from photos where id = 1;', (err, res) => {
//   console.log(err ? err.stack : res.rows)
//   pool.end()
// });

module.exports = pool;