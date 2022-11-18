const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

const checkTimeslots = (timeslots) => {
    for (const i in timeslots) {
        let slot = timeslots[i]
        if (slot.day === '' || slot.start === '' || slot.end === '') {
            console.log("Timeslot is blank at index ",i,"\ntimeslot =",slot)
            return false;
        }
    }
}

router.post('/', async(req, res, next) => {
    try {
        const body = req.body;

        //check validity ???? IT NO WORKY
        // if(!body.course.course_name || !body.course.description || !checkTimeslots(body.course.timeslots))
        // {
        //     console.log("undefined area (syllabus not counted) =", body.course)
        //     res.sendStatus(400);
        //     next();
        // }
        if(body.professor.role_id !== 2)
        {
            console.log("User is not professor")
            res.sendStatus(403);
            next();
        }
        console.log(body);
        const result = await req.models.course.createCourse(body);
        console.log("Result =",result)
        const timeslots = body.course.timeslots;
        for (const i in timeslots) {
            const timeslotresult = await req.models.course.addTimeslots(timeslots[i], result[0])
        }
        res.sendStatus(201);
        next();
    } catch (err) {
        console.error('Course creation failed:', err);
        res.status(500).json({ message: err.toString() });
        next();
    }
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