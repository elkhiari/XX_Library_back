const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var Userdb = require("../model/users.model");
const {sendingMail} = require("../mail/mailler");



exports.create = async (req, res) => {
  try {

      const { name, email, gender, status, password } = req.body;
      const avatar = "null";

      const ExistUser = await Userdb.find({ email });
      if (ExistUser.length > 0) {
        return res.status(401).json({ message: "User already exists" });
      }
      const hashpassword = await bcrypt.hash(password, 10);
      if (!hashpassword) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const user = new Userdb({
        name,
        email,
        password: hashpassword,
        gender,
        avatar

      });
      await user.save();
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        process.env.SECRET,
        { expiresIn: "48h" }
      );

      const newUser = {
        avatar: user.avatar,
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        role: user.role,
      };
      const resultat = await sendingMail(user, token, "register", req.ip);
      res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Userdb.findOne({ email });
    if (!user) return res.status(401).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch == false) {
      return res.status(401).json({ message: "password incorrect" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.SECRET,
      { expiresIn: "48h" }
    );
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const resultat = await sendingMail(user,token,'login',clientIP);
    console.log(clientIP)

    const newUser = {
        avatar: user.avatar,
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        role: user.role,
    }

    res.status(200).json({ message: "login success", token,user:newUser });



  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
exports.GetMe = (req, res) => {
  res.status(201).json({ user: req.user });
};

// retrieve and return aconstll users / retrieve and return a single user :
exports.get_users = async (req, res) => {
  try {
    const user = await Userdb.find();
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.delete = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await Userdb.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user deleted success" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};


exports.get_user_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Userdb.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ user }); 
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
    
  }
