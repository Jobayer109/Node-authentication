const getAllUsers = (res, req) => {
  res.send("All users get");
};
const getOneUser = (res, req) => {
  res.send("One user get");
};
const createUser = (res, req) => {
  res.send("user created");
};
const deleteUser = (res, req) => {
  res.send("user deleted");
};
const updateUser = (res, req) => {
  res.send("user updated");
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
