const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin'], 
        default: 'admin'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); 
    }
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
