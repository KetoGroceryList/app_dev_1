const express = require('express');
const {
  getSavedLists,
  saveNewList,
  addToList,
  updateExistingListById,
  deleteGroceryListById,
  deleteAllGroceryLists,
} = require('../controllers/groceryList');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', protect, getSavedLists);
router.post('/', protect, saveNewList);
router.delete('/', protect, deleteAllGroceryLists);
router.delete('/:id', protect, deleteGroceryListById);
router.put('/:id', protect, updateExistingListById);
router.put('/add/:id', protect, addToList);

//router.get('/:id', protect, getSavedListById);

module.exports = router;
