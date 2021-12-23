const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/students');

router.post('/add-student', StudentController.add_student);
router.get('/', StudentController.show_all_students);
router.get('/:id', StudentController.get_student_by_id);
router.post('/:studentId/add-course', StudentController.add_course);

module.exports = router;