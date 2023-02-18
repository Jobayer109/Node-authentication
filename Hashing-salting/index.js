require("./config/db");
const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const User = require("./models/user.models");

// Hashing-salting password
const bcrypt = require("bcrypt");
const saltRounds = 10;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "views/success.html"));
});
app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "views/error.html"));
});

// User login
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          res.status(200).redirect("/success");
        } else {
          res.status(404).redirect("/error");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Create user and save to database
app.post("/register", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(200).redirect("/login");
    });
  } catch (error) {
    console.log(error);
  }
});

// Server start
const start = async () => {
  try {
    await dbConnect(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`auth server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
