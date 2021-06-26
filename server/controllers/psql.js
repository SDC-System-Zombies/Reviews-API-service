var models = require('../models/psql');

module.exports = {

  get: function (req, res) {
    let productId = req.query.product_id;
    let sort = req.query.sort || 'id';
    models.getAll(productId, sort, function(err, results) {
      if (err) { console.log(err); res.send(404)}
      res.send(results);
    });
  },

  getMeta: function (req, res) {
    let productId = req.query.product_id;
    models.getMeta(productId, function(err, results) {
      if (err) { console.log(err); res.send(404)}
      res.send(results);
    });
  },

  post: function (req, res) {
    let data = req.body;
    models.post(body, function(err, results) {
      if (err) { console.log(err); res.send(404)}
      res.send(results);
    });
  },

  put: function (req, res) {
    let endpoint = req.path.replace(/.*\//,'');
    let review_id = req.query.review_id;
    models.put(endpoint, review_id, function(err, results) {
      if (err) { console.log(err); res.send(404)}
      res.send(results);
    });
  }

};