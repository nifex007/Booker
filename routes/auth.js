const express = require('express');
const {register, logIn, currentUser} = require('../controllers/AuthController');


const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);
router.get('/me', protect, currentUser);

module.exports = router;