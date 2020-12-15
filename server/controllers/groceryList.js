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
  const foods = req.body; //needs array of food object Id's to be passed from FE

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
//route   PUT /api/groceryList/add/:id
//access  private
exports.addToList = asyncHandler(async (req, res, next) => {
  // To be fixed later
  // const foodToAdd = await Food.findOne({ _id: req.params.id });
  // const foodToAddName = foodToAdd.name;
  // const groceryLists = await GroceryList.find(req.user.id);
  // if (!groceryLists) {
  //   return next(ErrorResponse('This user does not have any grocery list', 400));
  // }
  // for (const food of groceryListArray) {
  //   if (food.name === foodToAddName) {
  //     return next(
  //       new ErrorResponse(
  //         `${foodToAddName} is already on this grocery list`,
  //         400
  //       )
  //     );
  //   }
  // }
  // groceryListArray.push(foodToAddName);
  // groceryList.save();
  // res.status(201).json({
  //   success: true,
  //   data: groceryList,
  // });
});
