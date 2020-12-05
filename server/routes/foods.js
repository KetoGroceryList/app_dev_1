const express = require('express');
const {
  getFoods,
  createFood,
  deleteFood,
  updateFood,
} = require('../controllers/foods');

const router = express.Router();

router.get('/', getFoods);
router.post('/', createFood);
router.delete('/', deleteFood);
router.put('/:id', updateFood);

module.exports = router;
