require("./config/db");
const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const User = require("./models/user.models");

// Hashing authentication
const md5 = require("md5");
// console.log(md5("Hashing"));

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
    const password = md5(req.body.password);
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.redirect("/success");
    } else {
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Create user and save to database
app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password),
    });
    await newUser.save();
    // res.status(200).json(newUser);
    res.status(200).redirect("/login");
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
