const express = require("express");
const {register,login,findUser,getUsers  } = require('../controllers/userCtrl')

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/find/:userId').get(findUser);
Router.route('/').get(getUsers);

module.exports = Router;