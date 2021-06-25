const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});

let reviewsSchema = new mongoose.Schema({
  id: Number
});

let Reviews = mongoose.model('reviews', reviewsSchema);

let find = (callback) => {
  return Reviews.find({product_id:13023}).sort({stars:-1}).limit(25).exec(callback);
}

module.exports.find = find;