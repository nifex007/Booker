const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
        maxlength: 50
    }, 
    resourceCategory: {
        type: String
    },
    resourceCount: {
        type: Integer,
    }, 
    available : {
        type: Boolean
    }

});


module.exports = mongoose.model('Inventory', InventorySchema)