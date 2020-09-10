const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
        maxlength: 50
    }, 
    // TODO: Add user field 
    start: {
        type: Date,
        required: true
    },
    end : {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    released: {
        type: Boolean,
    },
    releasedAt: {
        type: Date
    }
});




