const express = require("express");

const {
  authUser,
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateUser,
  MoreView,
  SelesView,
  listUsers,
} = require("../controller/userController");

const { authProtect } = require("../middleware/authMiddleware");

const { guest } = require("../middleware/GuestMiddleware");

const { admin } = require("../middleware/adminMiddleware");
const {
  transView,
  postTrans,
  listTr,
} = require("../controller/transController");

const {
  listCs,
  postCs,
  costsView,
  postAdd,
} = require("../controller/costumerController");

const {
  listSom,
  listHor,
  inboxView,
  inboxUpdate,
} = require("../controller/inboxController");
const {
  listAdeega,
  addeegaView,
  addeegaUpdate,
} = require("../controller/adeegaController");
const {
  listWaiting,
  waitingView,
  delWaiting,
} = require("../controller/waitingController");
const router = express.Router();

//download app
router.route("/download/muraadapp").get(authProtect, (req, res) => {
  const app = process.cwd() + "/download/muraad.apk";
  res.download(app);
});
// seles part
router.route("/seles/view").get(authProtect, SelesView);

//home
router.route("/view").get(authProtect, authUser);
router.route("/more/:type").get(authProtect, MoreView);

//reg is not working
router.post("/register", admin, registerUser);

// login post
router.route("/login").post(guest, loginUser);

//logout post
router.post("/logout", logoutUser);

// done with api not frontend
// profile get and post
router.route("/profile").get(authProtect, profile);
router.route("/profile/update").post(authProtect, updateUser);

// done with api and frontend
// trans post and get
router.route("/tran/").get(authProtect, listTr);
router.route("/trans/view/:id").get(authProtect, transView);
router.route("/trans/post").post(authProtect, postTrans);

//done with api and frontend
// macamil get and post
router.route("/cost/").get(authProtect, listCs);
router.route("/cost/add").post(authProtect, postAdd);
router.route("/costs/view/:id").get(authProtect, costsView);
router.route("/cost/update").post(authProtect, postCs);

// done with api and frontend
// sms get and view
router.route("/somtel/").get(authProtect, listSom);
router.route("/hormuud/").get(authProtect, listHor);
router.route("/inbox/view/:id").get(authProtect, inboxView);
router.route("/inbox/update").post(authProtect, inboxUpdate);

// done with api and frontend
// adeega get and post
router.route("/adeega/:type").get(authProtect, listAdeega);
router.route("/adeegga/:type/:id").get(authProtect, addeegaView);
router.route("/adeegyada/update").post(authProtect, addeegaUpdate);

// done with api and frontend
// waiting get and post
router.route("/waiting/").get(authProtect, listWaiting);
router.route("/wait/:id").get(authProtect, waitingView);
router.route("/waiting/del").post(authProtect, delWaiting);
// this section only owner and admin
router.route("/list/").get(admin, listUsers);
// create new user
// add extra time and unban user

// view device list

////////////////////////
// admin role only

// change role

// delete or ban users
// mobile app api router

module.exports = router;
