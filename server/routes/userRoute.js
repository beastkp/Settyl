const express = require("express");
const {
  register,
  login,
  findUser,
  getUsers,
  sendMail
} = require("../controllers/userCtrl");
const authentication = require("../middleware/authorization");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/find").post(authentication, findUser);
Router.route("/").get(getUsers);
Router.route("/sendMail").post(sendMail);

module.exports = Router;
