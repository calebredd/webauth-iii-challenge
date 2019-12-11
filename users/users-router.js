const express = require("express"),
  bcrypt = require("bcryptjs"),
  restricted = require("../auth/restricted-middleware.js"),
  checkRole = require("../auth/check-role-middleware.js"),
  router = express.Router(),
  Users = require("./users-model.js"),
  secrets = require("../config/secrets"),
  jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.status(200).send("Welcome to the Register Page");
});
router.post("/register", (req, res) => {
  const { username, password, department } = req.body;
  const user = { username, department };
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = genToken(user);
      res.status(201).json({ saved, token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
  // res.status(200).json({ message: "Welcome to the Register Page" });
});

router.get("/login", (req, res) => {
  res.status(200).send("Welcome to the Login Page");
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Unable to access Database" });
    });
});

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Inaccessible" });
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
    department: user.department
  };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}

module.exports = router;
