const { Pool, Client } = require('pg');

const pool = new Pool({
  host: 'ec2-3-20-203-183.us-east-2.compute.amazonaws.com',
  hostname: 'ubuntu',
  user: process.env.DB_USER || 'postgres',
  password: 'woshiyuzhoumeishaonv!',
  database: 'sdc'
});

pool.connect((err, res) => {
  console.log(err? err : 'Connected to Prostgres db')
});

module.exports = pool;
