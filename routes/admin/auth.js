const express = require("express");

const {handleErrors} = require("./middlewares");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {requireEmail, requirePassword, requirePasswordConf, requireEmailExists, requireValidPasswordForUser} = require("./validators");

//Sub-router to link up to app in index.js
const router = express.Router();

//Handle incoming GET requests from the browser
router.get("/signup", (req, res) => {
  res.send(signupTemplate({req}));
});



//Handle incoming POST requests from the browser
router.post("/signup", [
  requireEmail,
  requirePassword,
  requirePasswordConf
], 
handleErrors(signupTemplate),
async (req, res) => {
  const {email, password} = req.body;

  const user = await usersRepo.create({email, password});

  req.session.userId = user.id;
  res.redirect("/admin/products");
});


//Signout
router.get("/signout", (req, res) => {
req.session = null; //Forget the session object from the cookie
res.send("You are logged out");
});

//Signin
router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post("/signin", [
requireEmailExists,
requireValidPasswordForUser
],
handleErrors(signinTemplate),
async (req, res) => {

const {email} = req.body;
const user = await usersRepo.getOneBy({email});

req.session.userId = user.id;
res.redirect("/admin/products");
});

module.exports = router;