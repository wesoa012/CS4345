const Account = require('../models/account');
const Register = require('../models/register');
const Login = require('../models/login');
const Course = require('../models/course');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      account: Account,
      register: Register,
      login: Login,
      course: Course
  }
  next();
}
module.exports = {
  createModelsMiddleware
}