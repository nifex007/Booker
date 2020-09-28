const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Please enter a name"]
    },
    email : {
        type: String,
        require: [true, "Email require"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    role: {
        type: String,
        enum: [ 'user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 


module.exports = mongoose.model('User', UserSchema); 