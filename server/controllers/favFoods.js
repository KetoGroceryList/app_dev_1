const Food = require('../models/Food');
const FavFoods = require('../models/FavFoods');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//desc    ADD Food to FavFoods by ID
//route   PUT /api/favFoods/:id
//access  private
exports.addFavFood = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const food = await Food.findOne({ _id: req.params.id });
  let favFoods = await FavFoods.findOne({ user: user });

  if (!favFoods) {
    favFoods = await FavFoods.create({
      user,
      favFoodsArray: [food.name],
    });
  }

  if (favFoods.favFoodsArray.includes(food.name)) {
    return next(
      new ErrorResponse('This item is already on your favourite list', 400)
    );
  }

  favFoods.favFoodsArray.push(food.name);
  favFoods.save();

  res.status(200).json({
    success: true,
    data: favFoods,
  });
});

//desc    DELETE Food from FavFoods
//route   DELETE /api/favFoods/
//access  private
//notes   !food and !favFoods should not be possible from UI
exports.deleteFavFood = asyncHandler(async (req, res, next) => {
  const food = await Food.findOne({ _id: req.params.id });
  let favFoods = await FavFoods.findOne({ user: req.user.id });

  favFoods.favFoodsArray = favFoods.favFoodsArray.filter(
    (favFood) => favFood !== food.name
  );

  favFoods.save();

  res.status(200).json({
    success: true,
    data: favFoods,
  });
});

//desc    GET FavFoods
//route   GET /api/favFoods/
//access  private
exports.getFavFoods = asyncHandler(async (req, res, next) => {
  const favFoods = await FavFoods.findOne({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: favFoods,
  });
});
