const Account = require('../models/account');
const Register = require('../models/register');
const Login = require('../models/login');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      account: Account,
      register: Register,
      login: Login
  }
  next();
}
module.exports = {
  createModelsMiddleware
}