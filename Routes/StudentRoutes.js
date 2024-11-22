const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/StudentContoller');
const upload = require('../uploadConfig');
const protectAdmin = require('../Middlewares/protectedRoutes');

router.post('/students', upload.single('profileImage'), protectAdmin, studentController.addStudent);
router.get('/students', protectAdmin, studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students/:id', upload.single('profileImage'), protectAdmin, studentController.updateStudent);
router.delete('/students/:id', protectAdmin, studentController.deleteStudent);

module.exports = router;
