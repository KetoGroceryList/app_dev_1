const Food = require('../models/Food');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.createFood = asyncHandler(async (req, res, next) => {
  const { name, foodType, imageUrl, protein, fats, fiber, netCarbs } = req.body;

  let food = await Food.findOne({ name });

  if (food) {
    return next(new ErrorResponse('This food already exists', 400));
  }

  const totalMacros = protein + fats + fiber + netCarbs;

  const macrosSplit = {
    protein: protein / totalMacros,
    fats: fats / totalMacros,
    fiber: fiber / totalMacros,
    netCarbs: netCarbs / totalMacros,
  };

  food = await Food.create({
    name,
    foodType,
    imageUrl,
    protein,
    fats,
    fiber,
    netCarbs,
    macrosSplit,
  });

  res.status(200).json(food);
});

exports.getFoods = asyncHandler(async (req, res, next) => {
  const foods = await Food.find();

  res.status(200).json(foods);
});
