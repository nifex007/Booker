const UserModel = require('../models/User.js');
const ErrorResponse = require('../utilities/errorResponse')
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const sendEmail = require('../utilities/emailSender');
const { subscribe } = require('../routes/auth.js');


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


 /**
 * Register Get Logged In User
 * POST /api/v1/auth/currentuser
 * @access Private
 **/


 exports.currentUser = asyncHandler(async (request, response, next) => {
     const user = await User.findById(request.user.id);

    response.status(200).json({success: true, data: user});
 });


 /**
 * Register Get Logged In User
 * GET /api/v1/auth/logout
 * @access Private
 **/


exports.logOut = asyncHandler(async (request, response, next) => {
   
    response.cookie('token','none', { expires: new Date( Date.now() + 10 * 1000),
    httpOnly: true });
   response.status(200).json({success: true, data: {}});
});

 

 exports.forgotPassword = asyncHandler(async (request, response, next) => {
    const user = await User.findOne({email: request.body.email});
    console.log(user.email)

    if (!user){
        return next(new ErrorResponse('No user with this email'));
    }

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    // create password reset url
    const resetUrl = `${request.protocol}://${request.get('host')}/api/v1/resetpassword/${resetPasswordToken}`;

    const message = `Click to change password ${resetUrl}`

   try {
       await sendEmail({
           email: user.email,
           subject: 'Password Reset', 
           message
           
       })
       response.status(200).json({"success": true, data: 'Email sent'})
   } catch (error) {
       console.log(error)
       user.resetPasswordToken = undefined;
       user.resetPasswordExpiry = undefined;

       await user.save({validateBeforeSave: false});

       return next(new ErrorResponse("Email not sent :(", 500));
    
   }

   response.status(200).json({success: true, data: user});
});

