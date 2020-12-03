const express = require('express');
const {
  register,
  login,
  getMe,
  logOut,
  updateDetails,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logOut);
router.put('/updatedetails', protect, updateDetails);
router.get('/me', protect, getMe);

module.exports = router;
