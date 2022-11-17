const knex = require('../database/knex');
const ACCOUNT_TABLE = 'accounts';

const fetchAccountBySmu_id = async (smu_id) => {
   //uses passed in id to get the associated account
   const query = knex(ACCOUNT_TABLE).where({ smu_id })
   const results = await query;
   return results;
}

const changeRole = async (smu_id, role_id) => {
   //uses id to update their role_id
   const query = knex(ACCOUNT_TABLE).update({ role_id }).where({ smu_id });
   const results = await query;
   return results;
}

const fetchAllAccounts = async () => {
   const query = knex(ACCOUNT_TABLE).select(
      "smu_id",
      "email",
      "first_name",
      "last_name",
      "role_id"
   );
   const results = await query;
   return results;
}

module.exports = {
   fetchAccountBySmu_id,
   changeRole,
   fetchAllAccounts
}