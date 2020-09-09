const express = require('express');
const { 
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController') 

const router = express.Router();

router.route('/bookings').get(getBookings);
router.route('/booking').post(createBooking);
router.route('/booking/:id').get(getBooking).put(updateBooking).delete(deleteBooking); 

module.exports = router;