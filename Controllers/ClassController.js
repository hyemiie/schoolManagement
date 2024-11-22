const Class = require('../Models/classModel');
const Teacher = require('../Models/teacherModel');

const createClass = async (req, res) => {
    try {
        const { name, teacherId } = req.body;
        if (!name || !teacherId) {
            return res.status(400).json({ message: 'Name and Teacher ID are required' });
        }
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const newClass = new Class({ name, teacherId });
        await newClass.save();

        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getClasses = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const classes = await Class.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (!classes.length) {
            return res.status(404).json({ message: 'No classes found' });
        }

        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getClassById = async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id).populate('teacherId');
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(classItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const { name, teacherId } = req.body;

        if (!name || !teacherId) {
            return res.status(400).json({ message: 'Name and Teacher ID are required' });
        }

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { name, teacherId },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass,
};
