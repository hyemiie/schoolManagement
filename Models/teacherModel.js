const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    profileImageUrl: { 
        type: String, 
        default: null 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    isDeleted: { 
        type: Boolean, 
        default: false
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
