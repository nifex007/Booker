const BookingModel = require('../models/Booking.js');
const ErrorResponse = require('../utilities/errorResponse')
const asyncHandler = require('../middlewares/async');

/**
 * Create new Booking
 * POST /api/v1/booking
 * @access Private
 */
exports.createBooking = asyncHandler(async (request, response, next) => {

    // add user to request body if
    request.body.user = request.user.id;

    
    const booking = await BookingModel.create(request.body);
    response.status(201).json({
        success: true,
        message: `${request.body.resourceName} booked :)`,
        data: booking
    }); 
}
); 

/**
 * Get all Bookings
 * GET /api/v1/bookings
 * @access Public
 */
 exports.getBookings = async (request, response, next) => {
    try {
        const bookings = await BookingModel.find();
        response.status(200).json({ success: true, message: 'OK', data: bookings })
    } catch (error) {
        response.status(400).json({ success: false, error: error.message}) 
    }
 };

  
 /**
 * Get single Booking
 * GET /api/v1/booking/:id
 * @access Private
 */
exports.getBooking = asyncHandler(async (request, response, next) => {
    const booking = await BookingModel.findById(request.params.id);
    if (!booking){
       return next(new ErrorResponse(`Booking with id of ${request.params.id} not found`, 404));
    }
    response.status(200).json({success: true, message: 'OK', data:booking})
}
);

/**
 * Update Booking
 * PUT /api/v1/booking/:id
 * @access Private
 */
exports.updateBooking = async (request, response, next) => {
    try {
        const booking = await BookingModel.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true});
        if (!booking) {
        return next(new ErrorResponse(`Booking with id of ${request.params.id} not found`, 404));
        }
        response.status(200).json({success:true, message: 'Booking Updated', data: booking});

    }catch(error) {
        next(error);

    }
    

};


/**
 * DeleteBooking
 * POST /api/v1/booking/:id
 * @access Private
 */
exports.deleteBooking = async (request, response, next) => {
    try {
        const booking = await BookingModel.findByIdAndDelete(request.params.id);
        if (!booking) {
            return next(new ErrorResponse(`Booking with id of ${request.params.id} not found`, 404));
        }
        response.status(200).json({success:true, message: 'Booking Deleted', data: booking});
    } catch (error) {
        next(error);
        
    }

};
