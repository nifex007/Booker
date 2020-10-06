const UserModel = require('../models/User.js');
const ErrorResponse = require('../utilities/errorResponse')
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');

/**
 * Register User
 * POST /api/v1/auth/Register
 * @access Public
 **/

 exports.register = asyncHandler( async (request, response, next) => {
     
    const {name, email, password, role} = request.body;
    const user = await User.create( {name, email, password, role});

    // token
    const token = user.getSignedJwtToken()

    response.status(200).json({ success: true, token});
 });
