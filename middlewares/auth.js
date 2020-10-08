const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utilities/errorResponse');
const User = require('../models/User');



exports.protect = asyncHandler(async (request, response, next) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized"), 401);
    }

    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decodedJWT);

        request.user = await User.findById(decodedJWT.id);

        next();
        
    } catch (error) {
        
    }
});