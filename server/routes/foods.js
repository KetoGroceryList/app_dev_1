const express = require('express');
const {
  getFoods,
  createFood,
  deleteFood,
  updateFood,
} = require('../controllers/foods');

const router = express.Router();

const { authorize } = require('../middleware/auth');

router.get('/', getFoods);
router.post('/', authorize('admin'), createFood);
router.delete('/:id', authorize('admin'), deleteFood);
router.put('/:id', authorize('admin'), updateFood);

module.exports = router;
