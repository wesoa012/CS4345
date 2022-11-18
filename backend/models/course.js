const knex = require('../database/knex');
const COURSES_TABLE = 'courses';
const COURSE_TIMES_TABLE = 'course_times';

const createCourse = async (body) => {
    const course_name = body.course.courseName;
    const description = body.course.description;
    const professor_id = body.professor.smu_id;
    const syllabus = body.course.syllabus;
    return knex(COURSES_TABLE).insert({ course_name, description, professor_id, syllabus });
}

const addTimeslots = async (slot, cid) => {
    console.log("Adding timeslot =", slot)
    const course_id = cid
    const day = slot.day;
    const start = slot.start;
    const end = slot.end;
    return knex(COURSE_TIMES_TABLE).insert({ day, start, end, course_id });
}

const getAllCourses = async () => {
    const query = knex(COURSES_TABLE);
    const results = await query;
    return results;
}

const getByCourseId = async (course_id) => {
    const query = knex(COURSES_TABLE).where({ course_id })
    const results = await query;
    return results;
}

const getByCourseName = async (course_name) => {
    const query = knex(COURSES_TABLE).where({ course_name })
    const results = await query;
    return results;
}

const getByProfessorId = async (course_name) => {
    const query = knex(COURSES_TABLE).where({ professor_id })
    const results = await query;
    return results;
}

const updateCourseData = async (course_id, professor_id) => {
    const course_name = body.course_name;
    const description = body.description;
    const syllabus = body.syllabus;
    if (coures_name !== undefined) {
        this.updateCourseName(course_id, professor_id);
    }
    if (description !== undefined) {
        this.updateDescription(course_id, professor_id);
    }
    if (syllabus !== undefined) {
        this.updateSyllabus(course_id, professor_id);
    }
    const newRecord = knex(COURSES_TABLE).where({ course_id });
    return newRecord;
}

const updateCourseName = async (course_id, professor_id) => {
    const course_name = knex(COURSES_TABLE).where({ course_id }).where({ professor_id }).set({ course_name });
}

const updateDescription = async (course_id, professor_id) => {
    const description = knex(COURSES_TABLE).where({ course_id }).where({ professor_id }).set({ description });
}

const updateSyllabus = async (course_id, professor_id) => {
    const syllabus = knex(COURSES_TABLE).where({ course_id }).where({ professor_id }).set({ syllabus });
}

module.exports = {
    createCourse,
    getAllCourses,
    getByCourseId,
    getByCourseName,
    getByProfessorId,
    updateCourseData,
    addTimeslots
}
