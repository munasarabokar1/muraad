const check = require("../models/functions/check.js");
const trans = require("../models/routes/trans.js");
const Inbox = require("../models/routes/msgs.js");
const Notification = require("../models/routes/notifications.js");
const Send = require("../models/routes/send.js");
const asyncHandler = require("express-async-handler");

getInfo = asyncHandler(async (req, res) => {
  const checks = new check(req.params.deviceid);
  res.json(await checks.Checking());
});

getTransections = asyncHandler(async (req, res) => {
  const tran = new trans(req.params.deviceid);
  res.json(await tran.Latest());
});

gets_messages = asyncHandler(async (req, res) => {
  const inbox = new Inbox(req.params.deviceid, req.params.types);
  res.json(await inbox.Msg());
});

gets_tracker = asyncHandler(async (req, res) => {
  const inbox = new Notification(req.params.deviceid, req.params.types);
  res.json(await inbox.Notification());
});

send_tracker = asyncHandler(async (req, res) => {
  const sender = new Send(req.params.deviceid, req.body);
  res.json(await sender.Sender());
});

module.exports = {
  getInfo,
  send_tracker,
  getTransections,
  gets_messages,
  gets_tracker,
};
