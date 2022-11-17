const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async(req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.course.createCourse(body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Course creation failed:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

router.put('/:id', async(req, res, next) => {
    try {
        const cId = req.params.course_id;
        const body = req.body;
        console.log(body);
        const result = await req.models.course.updateCourseData(cId, body);
        res.status(200).json(result);
    } catch (err) {
        console.error('Course update failed:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get all courses
router.get('/', async (req, res, next) => {
    try {
        const result = await req.models.course.getAllCourses();
        res.status(200).json(result);
    } catch (err) {
        console.error('Course not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by course id
router.get('/:course_id', async (req, res, next) => {
    try {
        const id = req.params.course_id;
        const result = await req.models.course.getCourseId(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Course not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by course name
router.get('/:course_name', async (req, res, next) => {
    try {
        const name = req.params.course_name;
        const result = await req.models.course.getByCourseName(name);
        res.status(200).json(result);
    } catch (err) {
        console.error('Course not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by professor id
router.get('/:professor_id', async (req, res, next) => {
    try {
        const id = req.params.professor_id;
        const result = await req.models.course.getByProfessorId(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Course not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

module.exports = router;