const knex = require('../database/knex');
const APPLICATIONS_TABLE = 'applications';
const APPLICATION_TIMES_TABLE = 'application_times';

const createApplication = async (body) => {
    const course_id = body.course.course_id
    const resume = body.resume;
    const smu_id = body.currUser.smu_id;
    const grade = body.grade;
    return knex(APPLICATIONS_TABLE).insert({ resume, smu_id, grade, course_id })
    // return getByApplicationNum(application_num);
}

const addTimeSlots = async (slot, anum) => {
    console.log("Adding timeslot =", slot)
    const app_num = anum
    const day = slot.day;
    const start = slot.start;
    const end = slot.end;
    return knex(APPLICATION_TIMES_TABLE).insert({ day, start, end, app_num});
}

const getAllApplications = async () => {
    const query = knex(APPLICATIONS_TABLE)
    const results = await query;
    return results;
}

const getByApplicationNum = async (application_num) => {
    const query = knex(APPLICATIONS_TABLE).where({ application_num })
    const results = await query;
    return results;
}

const getBySMUId = async (smu_id) => {
    const query = knex(APPLICATIONS_TABLE).where({ smu_id })
    const results = await query;
    return results;
}

const getByGrade = async (grade) => {
    const query = knex(APPLICATIONS_TABLE).where({ grade })
    const results = await query;
    return results;
}

module.exports = {
    createApplication,
    getAllApplications,
    getByApplicationNum,
    getBySMUId,
    getByGrade,
    addTimeSlots
}