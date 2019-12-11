module.exports = department => {
  return function(req, res, next) {
    if (req.decodedJwt.department && req.decodedJwt.department.includes(department)) {
      next();
    } else if (req.decodedJwt.department.includes("Admin")) {
      next();
    } else {
      res.status(403).json({ you: "Don't have permission" });
    }
  };
};
