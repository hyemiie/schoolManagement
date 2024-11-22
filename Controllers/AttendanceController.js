const Attendance = require('../Models/attendanceModel');
const Student = require('../Models/studentModel');
const Class = require('../Models/classModel');

const markAttendance = async (req, res) => {
    try {
        const { studentId, classId, status } = req.body;
        if (!studentId || !classId || !status) {
            return res.status(400).json({ message: 'Student ID, Class ID, and Status are required' });
        }
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const classRecord = await Class.findById(classId);
        if (!classRecord) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const attendance = new Attendance({ studentId, classId, status });
        await attendance.save();

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAttendanceForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
                if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const attendanceRecords = await Attendance.find({ studentId });

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this student' });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAttendanceForClass = async (req, res) => {
    try {
        const { classId } = req.params;

        if (!classId) {
            return res.status(400).json({ message: 'Class ID is required' });
        }

        const attendanceRecords = await Attendance.find({ classId });

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this class' });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { studentId, classId, status } = req.body;

        if (!studentId || !classId || !status) {
            return res.status(400).json({ message: 'Student ID, Class ID, and Status are required' });
        }

        const attendance = await Attendance.findOneAndUpdate(
            { studentId, classId },
            { status },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    markAttendance,
    getAttendanceForStudent,
    getAttendanceForClass,
    updateAttendance
};
