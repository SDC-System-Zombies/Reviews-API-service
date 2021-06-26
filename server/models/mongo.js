const mongo = require('../databases/mongodb');

module.exports = {

  getAll: (productId, sort, callback) => {
    mongo.getAll(productId, (data) => { callback(null, data) });
  },

  getMeta: (productId, callback) => {
    mongo.getMeta(productId, (data) => { callback(null, data) });
  },

  post: (body, callback) => {
    const queryStr = `INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES
    (DEFAULT, ${body.product_id}, ${body.rating}, CURRENT_DATE, ${body.summary}, ${body.body}, ${body.recommend}, ${body.name}, ${body.reviewer_email});`;
    pool.query(queryStr)
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {console.log('insert table error:' + err); callback(err);});
  },

  put: (endpoint, review_id, callback) => {
    let col;
    let queryStr;
    if (endpoint === 'helpful') {
      queryStr = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`;
    }
    if (endpoint === 'report') {
      queryStr = `UPDATE reviews SET reported = true WHERE id = ${review_id}`;
    }

    pool.query(queryStr)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {console.log('insert table error:' + err); callback(err);});

  }

}

// module.exports.getAll(13023, (data) => console.log(data.rows));