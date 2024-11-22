const express = require('express');
const router = express.Router();
const classController = require('../Controllers/ClassController');
const protectAdmin = require('../Middlewares/protectedRoutes');


router.post('/classes', protectAdmin, classController.createClass);
router.get('/classes', classController.getClasses);
router.get('/classes/:id', classController.getClassById);
router.put('/classes/:id', protectAdmin,  classController.updateClass);
router.delete('/classes/:id',protectAdmin, classController.deleteClass);

module.exports = router;
