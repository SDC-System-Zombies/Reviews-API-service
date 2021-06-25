const pool = require('../databases/postgres');
// console.log(pool);

module.exports = {

  getAll: (productId, sort, callback) => {

    const queryStr = `SELECT photos.review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, photos.id, photos.url FROM reviews JOIN photos ON reviews.id = photos.review_id
    WHERE reviews.product_id = ${productId} ORDER BY ${sort} DESC;`;

    pool.query(queryStr)
      .then((data) => {
        let detail={};
        detail.product = productId;
        detail.results = [];
        let results = [];
        let photos = [];
        let reviewIds = [];
        for (let i of data.rows) {
          photos.push({id: i.id, url: i.url});
          if (reviewIds.indexOf(i.review_id) < 0) {
            reviewIds.push(i.review_id);
            delete i.id;
            delete i.url;
            i.photos = photos;
            results.push(i);
          }
        }
        detail.results = results;

        callback(null, detail);
      })
      .catch((err) => {console.log('Query All Error: ' + err); callback(404)});
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