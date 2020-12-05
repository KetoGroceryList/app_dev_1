const express = require('express');
const { addFavFood } = require('../controllers/favFoods');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.put('/add', protect, addFavFood);

module.exports = router;
