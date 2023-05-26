const express = require('express');
const route_users = express.Router();

const controller = require("../controller/users.controller");
const {checkisLogged} = require("../../middleware/checkAuth");
const { checkAdmmin } = require('../../middleware/checkAdmin');


route_users.route('/register').post(controller.create)
route_users.route('/login').post(controller.login);
route_users.route('/me').get(checkisLogged, controller.GetMe);
route_users.route('/:id').delete(checkisLogged,checkAdmmin,controller.delete);
route_users.route('/').get(checkisLogged,checkAdmmin,controller.get_users);

module.exports = route_users;