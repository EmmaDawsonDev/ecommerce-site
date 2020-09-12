const express = require("express");

const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");


//Sub-router to link up to app in index.js
const router = express.Router();

//Handle incoming GET requests from the browser
router.get("/signup", (req, res) => {
  res.send(signupTemplate({req}));
});



//Handle incoming POST requests from the browser
router.post("/signup", async (req, res) => {
 const {email, password, passwordConfirmation} = req.body;
const existingUser = await usersRepo.getOneBy({email});
  if (existingUser) {
    return res.send("This email already exists");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  const user = await usersRepo.create({email, password});

  req.session.userId = user.id;
  res.send("Account created!");
});


//Signout
router.get("/signout", (req, res) => {
req.session = null; //Forget the session object from the cookie
res.send("You are logged out");
});

//Signin
router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
const {email, password} = req.body;
const user = await usersRepo.getOneBy({email});

if (!user) {
  return res.send("Email not found");
}
const validPassword = await usersRepo.comparePasswords(
  user.password, 
  password
);
if (!validPassword) {
  return res.send("Invalid password");
}

req.session.userId = user.id;
res.send("You are signed in");
});

module.exports = router;