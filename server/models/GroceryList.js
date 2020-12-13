const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  groceryListArray: {
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

module.exports = GroceryList = mongoose.model('GroceryList', GroceryListSchema);
