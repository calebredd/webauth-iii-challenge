const bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js");
// const Users=require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "Shall not pass!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "can't touch that!" });
  }
  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: "Invalid credentials" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: "Ran into issues" });
  //     });
  // }
};
