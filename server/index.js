require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const router = require('./routes.js');
const PORT = process.env.PORT || 3000;
let app = express();

// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/', router);

app.listen(PORT, function() {
  console.log(`listening on PORT ${PORT}`);
});