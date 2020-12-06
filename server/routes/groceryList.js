const express = require('express');
const {
  getSavedLists,
  saveCurrentList,
  addToList,
} = require('../controllers/groceryList');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', protect, getSavedLists);
router.post('/', protect, saveCurrentList);
router.put('/add/:id', protect, addToList);

module.exports = router;
