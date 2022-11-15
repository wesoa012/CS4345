const knex = require('../database/knex');
const ACCOUNT_TABLE = 'applications';

const createApplication = async (body) => {
    const application_num = body.application_num;
    const resume = body.resume;
    const smu_id = body.smu_id;
    const grade = body.grade;
    return this.getByApplicationNum(application_num);
}
module.exports = {
    createApplication
}

const getAllApplications = async () => {
    const query = knex(APPLICATION_TABLE)
    const results = await query;
    return results;
}
module.exports = {
    getAllApplications
}

const getByApplicationNum = async (application_num) => {
    const query = knex(APPLICATION_TABLE).where({ application_num })
    const results = await query;
    return results;
}
module.exports = {
    getByApplicationNum
}

const getBySMUId = async (smu_id) => {
    const query = knex(APPLICATION_TABLE).where({ smu_id })
    const results = await query;
    return results;
}
module.exports = {
    getBySMUId
}

const getByGrade = async (grade) => {
    const query = knex(APPLICATION_TABLE).where({ grade })
    const results = await query;
    return results;
}
module.exports = {
    getByGrade
}