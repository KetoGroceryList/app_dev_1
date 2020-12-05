const mongoose = require('mongoose');
const FoodSchema = require('./Food').schema;

const FavFoodsSchema = new mongoose.Schema({
  favFoodsArray: {
    type: [FoodSchema],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = FavFoods = mongoose.model('FavFoods', FavFoodsSchema);
