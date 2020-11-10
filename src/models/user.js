const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name required'],
        validate: value => {
            if (value.length > 55) throw { success: false, message: 'Invalid name : Too long' }
        }
    },
    email: {
        type: String,
        required: [true, 'User email required'],
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) throw { success: false, message: 'Invalid Email address' }
            if (value.length > 100) throw { success: false, message: 'Your password must contains less than 100 characters' }
        }
    },
    password: {
        type: String,
        required: [true, 'User password required']
    },
    phone: {
        type: String,
        validate: value => {
            if (!validator.isMobilePhone(value)) throw { success: false, message: 'Invalid phone number' }
        }
    },
    token: {
        type: String
    },
    refresh_token: {
        type: String
    },
    reset_password: {
        code: {
            type: String
        },
        date: {
            type: Number
        }
    },
    double_authentification: {
        activated: {
            type: Boolean
        },
        code: {
            type: String
        },
        date: {
            type: Number
        }
    },
    verify_email: { // Also use when email is changed        
        code: {
            type: String
        },
        date: {
            type: Number
        },
        verified: {
            type: Boolean
        }
    },
    verify_phone: { // Also use when phone is changed
        code: {
            type: String
        },
        date: {
            type: Number
        },
        verified: {
            type: Boolean
        }
    },
    avatar: {
        type: String
    },
    connexionDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        if (user.password.length < 7) throw { success: false, message: 'Your password must contains at least 7 characters' }
        if (user.password.length >= 18) throw { success: false, message: 'Your password must contains less than 18 characters' }
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;