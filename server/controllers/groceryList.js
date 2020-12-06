const Food = require('../models/Food');
const GroceryList = require('../models/GroceryList');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//desc    GET saved lists
//route   GET /api/groceryList/
//access  private
exports.getSavedLists = asyncHandler(async (req, res, next) => {
  const groceryLists = await GroceryList.find({ user: req.user.id });

  if (!groceryLists) {
    return next(ErrorResponse('You do not have any saved grocery list', 400));
  }

  res.status(200).json({
    success: true,
    data: groceryLists,
  });
});

//desc    SAVE current list
//route   POST /api/groceryList/
//access  private
exports.saveCurrentList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const foods = req.body; //needs array of string to be passed from FE

  const groceryList = await GroceryList.create({
    user,
    groceryListArray: foods,
  });
  res.status(200).json({
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

  groceryListArray.push(foodToAddName);
  groceryList.save();

  res.status(201).json({
    success: true,
    data: groceryList,
  });
});
