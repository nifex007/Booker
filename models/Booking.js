const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
        maxlength: 50
    }, 
    // TODO: Add user field 
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end : {
        type: Date,
        required: true
    },
    purpose: {
        type: String,
        required: true,
        maxlength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    released: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date
    }
});


module.exports = mongoose.model('Booking', BookingSchema);




