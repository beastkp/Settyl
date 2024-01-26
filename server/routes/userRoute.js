const express = require("express");
const {register,login,findUser,getUsers  } = require('../controllers/userCtrl')
const authentication = require('../middleware/authorization');

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/find').post(authentication,findUser);
Router.route('/').get(getUsers);

module.exports = Router;