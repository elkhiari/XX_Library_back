const express = require("express");
const route_user = express.Router();

const services = require("../services/render");
const controller = require("../controller/users.controller");
const middleware = require("../../middleware/checkAuth");

// routes :
route.get("/", services.homeRoute);

route.get("/add-user", services.AddUser);

route.get("/update-user", services.UpdateUser);



module.exports = route;
