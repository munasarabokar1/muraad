const asyncHandler = require("express-async-handler");
const CreateUser = require("../model/CreateUser");
const LoginUser = require("../model/LoginUser");
const HomeView = require("../model/Home");
const Users = require("../model/Users");

//@desc home view
// Route Get /api/user/view
//@access Privite
const authUser = asyncHandler(async (req, res) => {
  await new HomeView(req, res).HomeView();
});

//@desc More home view
// Route Get /api/user/more/:type
//@access Privite
const MoreView = asyncHandler(async (req, res) => {
  await new HomeView(req, res).AnalysisView();
});

//@desc More home view
// Route Get /api/user/seles/view
//@access Privite
const SelesView = asyncHandler(async (req, res) => {
  await new HomeView(req, res).Seles();
});

//@desc profile user
// Route Get /api/user/profile
//@access Privite
const profile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc set user token
// Route Post /api/user
//@access Privite
const updateUser = asyncHandler(async (req, res) => {
  await new Users(req, res).UpdateUser();
});

//@desc More lis user
// Route Get /api/user/list
//@access admin and owner only
const listUsers = asyncHandler(async (req, res) => {
  await new Users(req, res).List();
});

//@desc Register New User
// Route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  await new CreateUser(req, res).CreateUser();
});

//@desc Login user
// Route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  await new LoginUser(req, res).Login();
});

//@desc Login user
// Route Post /api/users/logout
//@access public
const logoutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ massage: "User logged out" });
});

module.exports = {
  authUser,
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateUser,
  MoreView,
  SelesView,
  listUsers,
};
