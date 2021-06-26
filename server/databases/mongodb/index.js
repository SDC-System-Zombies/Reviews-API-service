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

const Reviews = mongoose.model('reviews', reviewsSchema);

const Photos = mongoose.model('photos', photosSchema);


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

const find = (productId, callback) => {
  Reviews.find({product_id:`${productId}`})
    .then((data) => {callback(data)})
    .catch((err) => {console.log(err); callback(404)});
}

module.exports.find = find;