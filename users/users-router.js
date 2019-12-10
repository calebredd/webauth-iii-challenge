const express = require("express"),
  bcrypt = require("bcryptjs"),
  router = express.Router();

router.get("/register", (req, res) => {
  res.status(200).send("Welcome to the Register Page");
});
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user={username};
  const hash=bcrypt.hashSync(password, 10);
  user.password=hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  res.status(200).json({ message: "Welcome to the Register Page" });
});

router.get("/login", (req, res) => {
  res.status(200).send("Welcome to the Login Page");
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  //const hash=bcrypt.hashSync(password, 10);
  
  Users.findBy({username}).first()
    .then(user => {
      if(user&&bcrypt.compareSync(password, user.password)){
        const token=genToken(user);
        res.status(200).json({
          message:`Welcome ${user.username}!`,
          token:token
        });
      }else{
        res.status(401).json({message:"You shall not pass!"});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  res.status(200).json({ message: "Welcome to the Register Page" });
});

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Users Page");
});

module.exports = router;
