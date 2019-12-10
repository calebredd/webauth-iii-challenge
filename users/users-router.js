const express = require("express"),
  router = express.Router();

router.get('/register',(req,res)=>{
  res.status(200).send('Welcome to the Register Page')
})
router.get('/login',(req,res)=>{
  res.status(200).send('Welcome to the Login Page')
})
router.get('/users',(req,res)=>{
  res.status(200).send('Welcome to the Users Page')
})

module.exports = router;
