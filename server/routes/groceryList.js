const express = require('express');
const {
  getSavedLists,
  saveCurrentList,
  addToList,
  deleteGroceryListById,
  deleteAllGroceryLists,
} = require('../controllers/groceryList');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', protect, getSavedLists);
router.post('/', protect, saveCurrentList);
router.delete('/', protect, deleteAllGroceryLists);
router.delete('/:id', protect, deleteGroceryListById);
router.put('/add/:id', protect, addToList);

//router.get('/:id', protect, getSavedListById);

module.exports = router;
