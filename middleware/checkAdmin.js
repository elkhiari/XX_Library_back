exports.checkAdmmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    next();
}