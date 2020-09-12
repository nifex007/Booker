const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        maxlength: 50,
        
    }, 
    resourceCategory: {
        type: String
    },
    resourceCount: {
        type: Number,
    }, 
    available : {
        type: Boolean
    }

}, {strict: true});


module.exports = mongoose.model('Inventory', InventorySchema)