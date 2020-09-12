const BookingModel = require('../models/Booking.js');
/**
 * Create new Booking
 * POST /api/v1/booking
 * @access Private
 */
exports.createBooking = async (request, response, next) => {
    
    const booking = await BookingModel.create(request.body);
    response.status(201).json({
        success: true,
        message: `${request.body.resourceName} booked :)`,
        data: booking
    }); 
};


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
        response.status(400).json({ success: false, message:error.message}) 
    }
 };

  
 /**
 * Get single Booking
 * GET /api/v1/booking/:id
 * @access Private
 */
exports.getBooking = async (request, response, next) => {
    try {
        const booking = await BookingModel.findById(request.params.id);
        if (!booking){
            return response.status(404).json({success: false, message: 'Booking not found'});
        }
        response.status(200).json({success: true, message: 'OK', data:booking})
    } catch (error) {
        response.status(400).json({success: false, message:error.message});   
    }

};


/**
 * Update Booking
 * PUT /api/v1/bookings/:id
 * @access Private
 */
exports.updateBooking = (request, response, next) => {

};


/**
 * DeleteBooking
 * POST /api/v1/booking/:id
 * @access Private
 */
exports.deleteBooking = (request, response, next) => {

};
