const mongoose = require('mongoose');

const FavFoodsSchema = new mongoose.Schema({
  favFoodsArray: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
      },
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = FavFoods = mongoose.model('FavFoods', FavFoodsSchema);
