const express = require('express');
const {
  register,
  login,
  getMe,
  logOut,
  updateDetails,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logOut);
router.put('/updatedetails', protect, updateDetails);
router.delete('/', protect, deleteUser);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
