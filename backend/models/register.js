const knex = require('../database/knex');
const ACCOUNT_TABLE = 'accounts';
const bcrypt = require('bcrypt');
   
   const createAccount = async (smu_id, password, email, first_name, last_name, role_id) => {
      // console.log("raw password: ", password);
      const salt = await bcrypt.genSalt(10);
      // console.log("salted password: ", salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      // console.log('Hashed password', hashedPassword);

      console.log("creating an account")
      const query = knex(ACCOUNT_TABLE).insert({smu_id, password: hashedPassword, email, first_name, last_name, role_id});
      const results = await query;
      return results;
   }

   // const changeAccountType
module.exports = {
   createAccount
}