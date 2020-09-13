const ErrorResponse = require('../utilities/errorResponse');

const errorHandler = (error, request, response, next) => {

    let currentError = {...error};

    currentError.message = error.message;
    
    // Log error to console in red
    console.log(error.stack.red);

    // Mongoose Invalid ObjectId
     if (error.name === 'CastError') {
        const message = `Resource with id of ${error.value} not found`;
        currentError = new ErrorResponse(message, 404);
        
     }

    //  Mongoose Duplicate key error
     if (error.code === 11000) {
        const message = "Duplicate field noticed";
        currentError = new ErrorResponse(message, 400);
     }

     if (error.message === 'ValidationError') {
         const message = Object.values(error.errors).map(val => val.message);
         currentError = new ErrorResponse(message, 400);
     }

    response.status(currentError.statusCode || 500).json({
        success: false,
        error: currentError.message || "Server Error"
    });
}


module.exports = errorHandler;