const Food = require('../models/Food');
const GroceryList = require('../models/GroceryList');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//desc    SAVE current list
//route   POST /api/groceryList/
//access  private
exports.saveCurrentList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const walnuts = await Food.findOne({ name: 'Walnuts' });
  const avocado = await Food.findOne({ name: 'Avocado' });
  const pork = await Food.findOne({ name: 'Pork' });

  const currentList = [walnuts, avocado, pork];

  const groceryList = await GroceryList.create({
    user,
    groceryListArray: currentList,
  });
  res.status(201).json({
    success: true,
    data: groceryList,
  });
});

//desc    ADD food to an existing list by id
//route   PUT /api/shoppingList/:id
//access  private
exports.addToList = asyncHandler(async (req, res, next) => {
  const foodToAdd = await Food.findOne({ name: 'Avocado' });
  const foodToAddName = foodToAdd.name;
  const groceryList = await GroceryList.findById(req.params.id);

  if (!groceryList) {
    return next(ErrorResponse('This grocery list ID does not exist', 400));
  }

  const groceryListArray = groceryList.groceryListArray;

  for (const food of groceryListArray) {
    if (food.name === foodToAddName) {
      return next(
        new ErrorResponse(
          `${foodToAddName} is already on this grocery list`,
          400
        )
      );
    }
  }

  groceryListArray.push(foodToAdd);
  groceryList.save();

  res.status(201).json({
    success: true,
    data: groceryList,
  });
});
