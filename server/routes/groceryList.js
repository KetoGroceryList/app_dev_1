const express = require('express');
const { addToList, saveCurrentList } = require('../controllers/groceryList');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/', protect, saveCurrentList);
router.put('/add/:id', protect, addToList);

module.exports = router;
