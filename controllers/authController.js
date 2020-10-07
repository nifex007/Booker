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
    sendTokenResponse(user, 200, response)
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
    sendTokenResponse(user, 200, response);
 });


 const sendTokenResponse = (user, statusCode, response) => {
     const token = user.getSignedJwtToken();

     const options = {
         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
         httpOnly: true
     };

     
     if (process.env.NODE_ENV === 'production'){
         options.secure = true;
     }

     response.status(statusCode).cookie('token', token, options).json({success: true, token});
 }

