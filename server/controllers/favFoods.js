const Food = require('../models/Food');
const FavFoods = require('../models/FavFoods');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.addFavFood = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const food = await Food.findOne({ name: 'Pork' });

  let favFoods = await FavFoods.findOne({ user: req.user.id });

  if (!favFoods) {
    favFoods = await FavFoods.create({
      user,
      favFoodsArray: [food.name],
    });
  } else {
    favFoods.favFoodsArray.push(food.name);
    favFoods.save();
  }

  res.status(201).json({
    success: true,
    data: favFoods,
  });
});
