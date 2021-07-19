const mongo = require('../databases/mongodb');

module.exports = {

  getAll: (productId, sort, callback) => {
    mongo.getAll(productId, (data) => { callback(null, data) });
  },

  getMeta: (productId, callback) => {
    mongo.getMeta(productId, (data) => { callback(null, data) });
  },

  post: (body, callback) => {

  },

  put: (endpoint, review_id, callback) => {
    mongo.put(endpoint, review_id, (data) => { callback(null, data) });
  }

}

// module.exports.getAll(13023, (data) => console.log(data.rows));