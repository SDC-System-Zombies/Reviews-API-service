const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});

const reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: [{
    id: Number,
    url: String
  }]
});

const photosSchema = new mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String
});

const charsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String
});

const Reviews = mongoose.model('reviews', reviewsSchema);

const Photos = mongoose.model('photos', photosSchema);

const Chars = mongoose.model('chars', charsSchema);

const updateReviews = async () => {
  for (let i = 1000000; i < 6144923; i++) {
    let photos = [];
    await Photos.find({review_id: i})
      .then((data) => {
        for (let i of data) {
          photos.push({id: i.id, url: i.url});
        }
      })
      .then((data) => {
        Reviews.updateOne({id: i}, {photos: photos}, {upsert: false}, (err, data) => {
          if (err) {console.log(err)}
          console.log('update 1 record:' + i);
        })
      })
      .catch((err) => console.log(err));
  }

}


module.exports = {

  getAll: (productId, callback) => {
    Reviews.find({product_id:`${productId}`})
      .then((data) => {
        detail = {product: productId};
        results = [];
        data.forEach((i) => {
          i = i.toObject();
          delete i._id;
          delete i.product_id;
          results.push(i);
        })
        detail.results = results;
        callback(detail);
      })
      .catch((err) => {console.log(err); callback(404)});
  },

  getMeta: async (productId, callback) => {
    let results = {product_id: productId, rating: {}, recommended: {}, characteristics: {}};

    await Reviews.find({product_id:`${productId}`})
                 .then((data) => {
                    data.forEach((i) => {
                      if (results.rating[i.rating]) {
                        results.rating[i.rating]++;
                      } else {
                        results.rating[i.rating] = 1;
                      }
                      if (results.recommended[i.recommend]) {
                        results.recommended[i.recommend]++;
                      } else {
                        results.recommended[i.recommend] = 1;
                      }
                   });
                 })
                 .catch((err) => {console.log(err); callback(404)});

    await Chars.aggregate([
      {$match:
        {'product_id': 1} },
      {$lookup:
        {
          from: 'charReviews',
          localField: 'id',
          foreignField: 'characteristic_id',
          as: 'chars_value'
        }}
    ]).then(data => {
      data.forEach((i) => {
        let total = 0;
        let count = 0;
        i.chars_value.forEach((v) => {
          count++;
          total += v.value;
        })
        results.characteristics[i.name] = {id: i.id, value: total / count};
      })
      callback(results);
    })
      .catch((err) => {console.log(err); callback(404)});
  }

}
