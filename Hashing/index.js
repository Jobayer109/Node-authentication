require("./config/db");
const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use("/api/v1", userRouter);

// routes
app.get("/", (req, res) => {
  res.send("Hello auth server");
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
