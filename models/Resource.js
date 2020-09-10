// Room
// Projectors 
// Drivers 
// Vehicles

const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        maxlength: [25, "Name should not be longer than 10 characters!"]
    }, 
    description : {
        type: String,
        maxlength: [255, "Characters length should be more than 255"]
    },
    slug: {
        type: String
    },
    available : {
        type: Boolean
    }
});
 

module.exports = mongoose.model('Resource', ResourceSchema)