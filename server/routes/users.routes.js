const express = require('express');
const route_users = express.Router();
const multer = require("multer");

const path = require("path");

const controller = require("../controller/users.controller");
const {checkisLogged} = require("../../middleware/checkAuth");
const { checkAdmmin } = require('../../middleware/checkAdmin');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/uploads/"),
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname);
    },
  });
  
  const upload = multer({ storage }).single("avatar");

route_users.route('/register').post(
    upload,
    (req, res, next) => {
      if (req.fileValidationError) {
        return res.status(400).json({ message: "Invalid file format" });
      }
      next();
    },
    controller.create
  );
  
route_users.route('/login').post(controller.login);
route_users.route('/me').get(checkisLogged, controller.GetMe);
route_users.route('/:id').delete(checkisLogged,checkAdmmin,controller.delete).get(controller.get_user_by_id);
route_users.route('/').get(checkisLogged,checkAdmmin,controller.get_users);

module.exports = route_users;