const crypto = require('crypto'); 
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { bgCyan } = require('colors');

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

    if(!this.isModified('password')){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


// JWT
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign( {id : this._id}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRE});
}


// Compare Password to encrypted password
UserSchema.methods.comparePassword =  async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password)
}

// Reset password token to
UserSchema.methods.getResetPasswordToken = function(){

    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token to be save in resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expiry to 10mins
    this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;

    return resetToken; 
}
 

module.exports = mongoose.model('User', UserSchema); 