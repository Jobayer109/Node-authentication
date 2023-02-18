const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello auth server");
});

app.listen(port, () => {
  console.log(`Auth server listening on http://localhost:${port}`);
});
