const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/AttendanceController');
const protectAdmin = require('../Middlewares/protectedRoutes');

router.post('/attendance', protectAdmin, attendanceController.markAttendance);
router.get('/attendance/student/:studentId', attendanceController.getAttendanceForStudent);
router.get('/attendance/class/:classId', attendanceController.getAttendanceForClass);
router.put('/attendance', protectAdmin, attendanceController.updateAttendance);

module.exports = router;
