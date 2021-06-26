const {find} = require('../databases/mongodb');

module.exports = {

  getAll: (productId, sort, callback) => {

    find(productId, (data) => { callback(null, data) });
  },

  getMeta: (productId, callback) => {

    const queryStr = `SELECT reviews.rating, reviews.recommend, chars.name, charReviews.characteristic_id, charReviews.value FROM chars
      JOIN charReviews ON chars.id = charReviews.characteristic_id
      JOIN reviews ON reviews.id = charReviews.review_id
      WHERE chars.product_id = ${productId};`;

    pool.query(queryStr)
      .then((data) => {
        let result = {product_id: productId, rating: {}, recommended: {}};
        let characteristics = {};
        for (let i of data.rows) {
          if (result.rating[i.rating]) {
            result.rating[i.rating]++;
          } else {
            result.rating[i.rating] = 1;
          }
          if (result.recommended[i.recommend]) {
            result.recommended[i.recommend]++;
          } else {
            result.recommended[i.recommend] = 1;
          }
          if (characteristics[i.name]) {
            let average = (characteristics[i.name].value + i.value) / 2;
            characteristics[i.name].value = average;
          } else {
            characteristics[i.name] = {id: i.characteristic_id, value: i.value}
          }
        }
        result.characteristics = characteristics;
        callback(null, result);
      })
      .catch((err) => {console.log('Query Meta Error: ' + err); callback(404)});
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