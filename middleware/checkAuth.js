const jwt = require("jsonwebtoken");
const Userdb = require("../server/model/users.model");
exports.checkisLogged = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "messing token" });
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "token invalid" });
      }
      const user = await Userdb.findById(decoded.id, { password: 0 });
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
