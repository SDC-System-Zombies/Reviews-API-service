const express = require('express');
const router = require('./routes.js');
const PORT = process.env.PORT || 3000;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(express.static(__dirname + '/../client/dist'));

app.use('/', router);

app.listen(PORT, function() {
  console.log(`listening on PORT ${PORT}`);
});