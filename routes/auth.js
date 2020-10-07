const express = require('express');
const {register, logIn} = require('../controllers/AuthController');


const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);

module.exports = router;