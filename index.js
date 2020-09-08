const express = require("express");
const bodyParser = require("body-parser");


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
app.post("/", (req, res) => {
 console.log(req.body);
  res.send("Account created!");
});


//Set up server on a port
app.listen(3000, () => {
  console.log("Listening on port 3000");
});