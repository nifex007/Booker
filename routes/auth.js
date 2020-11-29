const express = require('express');
const {register, logIn, logOut, currentUser, forgotPassword} = require('../controllers/AuthController');


const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);
router.get('/logout', logOut);
router.get('/me', protect, currentUser);
router.post('/forgotPassword', forgotPassword)

module.exports = router;