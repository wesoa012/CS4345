const Account = require('../models/account');
const Register = require('../models/register');
const Login = require('../models/login');
const Course = require('../models/course');
const Application = require('../models/application');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      account: Account,
      register: Register,
      login: Login,
      course: Course,
      application: Application
  }
  next();
}
module.exports = {
  createModelsMiddleware
}