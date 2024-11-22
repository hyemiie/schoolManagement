const Teacher = require('../Models/teacherModel');
const upload = require('../uploadConfig');

const addTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        if (!name || !email || !subject) {
            return res.status(400).json({ message: 'All fields (name, email, subject) are required' });
        }
        const profileImageUrl = req.file ? req.file.path : null; 
        const teacher = new Teacher({ name, email, subject, profileImageUrl });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTeachers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const teachers = await Teacher.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTeacherById = async (req, res) => {
    
    const teacherId = req.params.id
    if (!teacherId) {
        return res.status(400).json({ message: 'No id was recieved' });
    }
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTeacher = async (req, res) => {

    try {
        const { name, email, subject } = req.body;
        const profileImageUrl = req.file ? req.file.path : null; 

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { name, email, subject, profileImageUrl },
            { new: true }
        );

        if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};
