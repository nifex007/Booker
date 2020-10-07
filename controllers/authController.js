const UserModel = require('../models/User.js');
const ErrorResponse = require('../utilities/errorResponse')
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');

/**
 * Register User
 * POST /api/v1/auth/register
 * @access Public
 **/

 exports.register = asyncHandler( async (request, response, next) => {
     
    const {name, email, password, role} = request.body;
    const user = await User.create( {name, email, password, role});

    // token
    const token = user.getSignedJwtToken()

    response.status(200).json({ success: true, token});
 });

 /**
 * LogIn User
 * POST /api/v1/auth/login
 * @access Public
 **/

exports.logIn = asyncHandler( async (request, response, next) => {
     
    const {email, password} = request.body;

    // validate auth credentials
    if (!email || !password) {
        return next(new ErrorResponse('Please provide credentials'));
    }

    // check for user
    const user = await User.findOne({email}).select('+password'); // allow password param

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // token
    const token = user.getSignedJwtToken()

    response.status(200).json({ success: true, token});
 });

