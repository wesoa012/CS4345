const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async(req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.application.createApplication(body);
        const timeslots = body.timeslots;
        for (const i in timeslots) {
            const timeslotresult = await req.models.application.addTimeSlots(timeslots[i], result[0])
        }
        res.status(201).json(result);
    } catch (err) {
        console.error('Application creation failed:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get all applications
router.get('/', async (req, res, next) => {
    try {
        const result = await req.models.course.getAllApplications();
        res.status(200).json(result);
    } catch (err) {
        console.error('Application not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by application num
router.get('/:application_num', async (req, res, next) => {
    try {
        const num = req.params.application_num;
        const result = await req.models.course.getByApplicationNum(num);
        res.status(200).json(result);
    } catch (err) {
        console.error('Application not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by smu id
router.get('/:smu_id', async (req, res, next) => {
    try {
        const id = req.params.smu_id;
        const result = await req.models.course.getBySMUId(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Application not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

// get by grade
router.get('/:grade', async (req, res, next) => {
    try {
        const grade = req.params.grade;
        const result = await req.models.course.getByGrade(grade);
        res.status(200).json(result);
    } catch (err) {
        console.error('Application not found:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

module.exports = router;