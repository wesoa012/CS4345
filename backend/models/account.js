const knex = require('../database/knex');
const ACCOUNT_TABLE = 'accounts';

const fetchAccountBySmu_id = async (smu_id) => {
   //uses passed in id to get the associated tenant but only the specified columns
   const query = knex(ACCOUNT_TABLE).where({ smu_id })
   const results = await query;
   return results;
}
module.exports = {
   fetchAccountBySmu_id
}