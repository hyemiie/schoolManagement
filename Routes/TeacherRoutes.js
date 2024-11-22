const express = require('express');
const router = express.Router();
const upload = require('../uploadConfig');  
const teacherController = require('../Controllers/TeacherController');
const protectAdmin = require('../Middlewares/protectedRoutes');


router.post('/teachers', upload.single('profileImage'), protectAdmin, teacherController.addTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teachers/:id', teacherController.getTeacherById);
router.put('/teachers/:id', upload.single('profileImage'), protectAdmin, teacherController.updateTeacher);
router.delete('/teachers/:id', protectAdmin,  teacherController.deleteTeacher);

module.exports = router;
