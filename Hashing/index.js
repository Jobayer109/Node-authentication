require("./config/db");
const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

// middleware
app.use(express.json());
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

const start = async () => {
  try {
    await dbConnect(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`Auth server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
