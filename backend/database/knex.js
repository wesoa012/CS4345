const knexConfig = require('../knexfile');
const knex = require('knex');
module.exports = knex(knexConfig.local); //knexConfig options viewable in the knexfile