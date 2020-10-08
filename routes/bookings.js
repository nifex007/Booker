const express = require('express');
const { 
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController') 

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.route('/bookings').get(getBookings);
router.route('/booking').post(protect, createBooking);
router.route('/booking/:id').get(protect, getBooking).put(protect, updateBooking).delete(protect, deleteBooking); 

module.exports = router;