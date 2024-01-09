const express = require("express");
const {
  getInfo,
  getTransections,
  gets_messages,
  gets_tracker,
  send_tracker,
} = require("../controller/controller.js");
const authSystem = require("../middleware/auth.js");
const reseller = require("../filters/reseller.js");
const {
  resellerController,
  resendController,
} = require("../controller/somtel.js");
const waiting = require("../filters/waiting.js");
const evcplus = require("../filters/hormuud.js");

const router = express.Router();

router.get("/getinformations/:deviceid", getInfo);

router.get("/gettransections/:deviceid", getTransections);

router.get("/getinboxs/:deviceid/:types", gets_messages);

router.get("/getnoficiation/:deviceid", gets_tracker);

router.route("/send/:deviceid").post(authSystem, evcplus);

router
  .route("/send/resseler/:deviceid")
  .post(authSystem, reseller, resellerController);
router
  .route("/send/waiting/:deviceid")
  .post(authSystem, waiting, resendController);

module.exports = router;
