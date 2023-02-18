const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getOneUser).delete(deleteUser).patch(updateUser);

module.exports = router;
