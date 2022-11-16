const knex = require('../database/knex');
const ACCOUNT_TABLE = 'courses';
    
const createCourse = async (body) => {
    const course_id = body.course_id;
    const course_name = body.course_name;
    const description = body.description;
    const professor_id = body.professor_id;
    const syllabus = body.syllabus;
    return this.getByCourseId(course_id);
}

const getAllCourses = async () => {
    const query = knex(COURSE_TABLE);
    const results = await query;
    return results;
}

const getByCourseId = async (course_id) => {
    const query = knex(COURSE_TABLE).where({ course_id })
    const results = await query;
    return results;
}

const getByCourseName = async (course_name) => {
    const query = knex(COURSE_TABLE).where({ course_name })
    const results = await query;
    return results;
}

const getByProfessorId = async (course_name) => {
    const query = knex(COURSE_TABLE).where({ professor_id })
    const results = await query;
    return results;
}

const updateCourseData = async (course_id, professor_id) => {
    const course_name = body.course_name;
    const description = body.description;
    const syllabus = body.syllabus;
    if(coures_name !== undefined) {
        this.updateCourseName(course_id, professor_id);
    }
    if(description !== undefined) {
        this.updateDescription(course_id, professor_id);
    }
    if(syllabus !== undefined) {
        this.updateSyllabus(course_id, professor_id);
    }
    const newRecord = knex(COURSE_TABLE).where({ course_id });
    return newRecord;
}

const updateCourseName = async (course_id, professor_id) => {
    const course_name = knex(COURSE_TABLE).where({ course_id }).where({ professor_id }).set({ course_name });
}

const updateDescription = async (course_id, professor_id) => {
    const description = knex(COURSE_TABLE).where({ course_id }).where({ professor_id }).set({ description });
}

const updateSyllabus = async (course_id, professor_id) => {
    const syllabus = knex(COURSE_TABLE).where({ course_id }).where({ professor_id }).set({ syllabus });
}

module.exports = {
    createCourse,
    getAllCourses,
    getByCourseId,
    getByCourseName,
    getByProfessorId,
    updateCourseData
}