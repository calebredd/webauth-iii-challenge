const express = require("express"),
  server = express(),
  port = process.env.PORT || 4000,
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  authRouter = require("../auth/auth-router.js"),
  userRouter = require("../users/users-router.js");

cors = require("cors");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("The server is running");
});
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);


// server.get("/token", (req, res) => {
//   //generate a token
//   const token = jwt.sign(
//     {
//       token: "here it is",
//       exp: 1000 * 60 * 5
//     },
//     "secret"
//   );
//   //return a token
//   res.status(400).json(token);
// });

server.get("/token", (req, res) => {
  const payload = {
    subject: "thisuser",
    userid: "credd",
    favoriteChili: "jalapeno"
  };
  const options = { expiresIn: "1d" };
  const token = jwt.sign(payload, options);
  res.json(token);
});

server.listen(port, () => {
  console.log("Starting server and listening on port: " + port);
});
module.exports = server;
