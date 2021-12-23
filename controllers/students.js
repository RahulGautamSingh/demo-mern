const Student = require('../models/Student');
const Course = require('../models/Course');

exports.add_student = async (req, res) => {
    try {
        const student = new Student(req.body);
        console.log(req.body);
        await student.save((error, data) => {
            console.log({ data: data });
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.json({ students: data });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.show_all_students = async (req, res) => {
    try {
        const students = await Student.find({});
        return res.json({ students });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.get_student_by_id = async (req, res) => {
    try {
        console.log(req.params);
        const student = await Student.findById(req.params.id);
        return res.json({ student });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.add_course = async (req, res) => {
    try {
        console.log({ params: req.params });
        console.log(req.body);
        const student = await Student.findById(req.params.studentId);
        const { name, code } = req.body;
        const newCourse = new Course({ name, code });
        console.log({ course: newCourse, student });
        await newCourse.save();
        await student.course.push(newCourse);
        await student.save();
        return res.json({ course: newCourse, student });
    } catch (err) {
        console.error(err);
        throw err;
    }
};