const express = require('express');
const route_Categories = express.Router();
const {checkisLogged} = require("../../middleware/checkAuth");
const { checkAdmmin } = require('../../middleware/checkAdmin');
const { get_categories,add_categories,get_categories_by_id,update_categories} = require("../controller/categories.controllers");

route_Categories.route('/').get(get_categories).post(checkisLogged,checkAdmmin,add_categories);
route_Categories.route('/:id').get(get_categories_by_id).patch(checkisLogged,checkAdmmin,update_categories);

module.exports = route_Categories;

