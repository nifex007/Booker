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
 exports.getBookings = (request, response, next) => {
    response.status(200).json({});    
 };

  
 /**
 * Get single Booking
 * GET /api/v1/booking/:id
 * @access Private
 */
exports.getBooking = (request, response, next) => {

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
