const express = require('express');
const {
  getFavFoods,
  addFavFood,
  deleteFavFood,
} = require('../controllers/favFoods');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', protect, getFavFoods);
router.put('/:id', protect, addFavFood);
router.delete('/:id', protect, deleteFavFood);

module.exports = router;
