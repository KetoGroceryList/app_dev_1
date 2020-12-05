const express = require('express');
const { getFoods, createFood } = require('../controllers/foods');

const router = express.Router();

router.get('/', getFoods);
router.post('/create', createFood);

module.exports = router;
