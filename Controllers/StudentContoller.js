const Student = require("../Models/studentModel");
const upload = require("../uploadConfig");
const Class = require("../Models/classModel");

const addStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;
    if (!name || !email || !classId) {
      return res.status(400).json({ message: 'All fields (name, email, class) are required' });
    }
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    const profileImageUrl = req.file ? req.file.path : null;
    const student = new Student({ name, email, classId, profileImageUrl });
    await student.save();
    await Class.findByIdAndUpdate(classId, { $inc: { studentCount: 1 } }, { new: true });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { classId, page = 1, limit = 10 } = req.query;
    const query = classId ? { classId, isDeleted: false } : { isDeleted: false };
    
    const students = await Student.find(query)
      .populate("classId")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'No id was received' });
  }

  try {
    const student = await Student.findById(req.params.id).populate("classId");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;
    if (!name || !email || !classId) {
      return res.status(400).json({ message: 'All fields (name, email, class) are required' });
    }

    const profileImageUrl = req.file ? req.file.path : null;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, classId, profileImageUrl },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classId = student.classId;
    await Class.findByIdAndUpdate(classId, { $inc: { studentCount: -1 } }, { new: true });

    res.status(200).json({ message: "Student soft deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
