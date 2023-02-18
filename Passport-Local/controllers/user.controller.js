const getAllUsers = (req, res) => {
  res.send("All users get");
};
const getOneUser = (req, res) => {
  res.send("One user get");
};
const createUser = (req, res) => {
  res.send("user created");
};
const deleteUser = (req, res) => {
  res.send("user deleted");
};
const updateUser = (req, res) => {
  res.send("user updated");
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
