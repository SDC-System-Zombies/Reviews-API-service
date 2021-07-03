const { Pool, Client } = require('pg');

const pool = new Pool({
  host: 'ec2-18-119-97-99.us-east-2.compute.amazonaws.com',
  hostname: 'ubuntu',
  user: process.env.DB_USER || 'postgres',
  password: 'woshiyuzhoumeishaonv!',
  database: 'sdc'
});

pool.connect((err, client, release) => {
  console.log(err? err : 'Connected to Prostgres db');
});

module.exports = pool;
