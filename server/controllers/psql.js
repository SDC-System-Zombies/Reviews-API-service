var models = require('../models/psql');
// var models = require('../models/mongo');

module.exports = {

  get: function (req, res) {
    let productId = req.query.product_id || 1;
    let sort = req.query.sort || 'id';
    return models.getAll(productId, sort, function(err, results) {
      if (err) { console.log(err); res.sendStatus(404)}
      res.send(results);
    });
  },

  getMeta: function (req, res) {
    let rNumber = Math.floor(Math.random() * 13025)
    let productId = req.query.product_id || rNumber;
    models.getMeta(productId, function(err, results) {
      if (err) { console.log(err); res.sendStatus(404)}
      res.send(results);
    });
  },

  post: function (req, res) {

    models.post(body, function(err, results) {
      if (err) { console.log('post controller error:' + err); res.sendStatus(404)}
      res.send(results);
    });
  },

  put: function (req, res) {
    let endpoint = req.path.replace(/.*\//,'');
    let review_id = req.path.match(/\d+/)[0];
    models.put(endpoint, review_id, function(err, results) {
      if (err) { console.log('put controller error:' + err); res.sendStatus(404)}
      res.send(results);
    });
  }

};