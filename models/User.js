const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Encrypt password 
UserSchema.pre('save', async function(next){
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


// JWT
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign( {id : this._id}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRE});
}
 

module.exports = mongoose.model('User', UserSchema); 