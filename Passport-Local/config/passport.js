const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return done(null, false, { msg: "email is invalid" });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { msg: "password is incorrect" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Create session id
// Whenever we login it creates an id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
