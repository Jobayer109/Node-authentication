const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const User = require("./models/user.models");
require("./config/db");
require("./config/passport");

// Bcrypt Hashing-salting auth
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Passport local strategy session base
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated) {
    return res.redirect("/profile");
  }
  next();
};

app.get("/login", checkLoggedIn, (req, res) => {
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
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "views/profile.html"));
});

// profile page protect
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect("/login");
  }
  res.redirect("/profile");
});

// Logout user
app.get("/logout", (req, res) => {
  try {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login user
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/profile", successRedirect: "/profile" })
);

// Create user
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
