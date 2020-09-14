// Room
// Projectors 
// Drivers 
// Vehicles

const mongoose = require('mongoose');
const slugify = require('slugify');

const ResourceSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        maxlength: [25, "Name should not be longer than 10 characters!"]
    }, 
    resourceCategory : {
        type: String,
        enum: ['Room', 'Driver', 'Projector', 'Vehicle']
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



ResourceSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
});

 

module.exports = mongoose.model('Resource', ResourceSchema)