const mongoose = require('mongoose');
//const FoodSchema = require('./Food').schema;

const GroceryListSchema = new mongoose.Schema({
  groceryListArray: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = GroceryList = mongoose.model('GroceryList', GroceryListSchema);
