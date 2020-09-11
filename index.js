const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

//Handle incoming GET requests from the browser
app.get("/", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" />
      <input name="passwordConfirmation" placeholder="Confirm password" />
      <button>Sign Up!</button>
    </form>
  </div>
  
  `);
});



//Handle incoming POST requests from the browser
app.post("/", async (req, res) => {
 const {email, password, passwordConfirmation} = req.body;
const existingUser = await usersRepo.getOneBy({email});
  if (existingUser) {
    return res.send("This email already exists");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }
  res.send("Account created!");
});


//Set up server on a port
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
