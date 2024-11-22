const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    classId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class', 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['Present', 'Absent'], 
        required: true 
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
