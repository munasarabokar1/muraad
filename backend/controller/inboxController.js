const asyncHandler = require("express-async-handler");
const Msg = require("../model/Msg");

//@desc List All Hormuud
// Route GET /hormuud
//@access Privite
const listHor = asyncHandler(async (req, res) => {
  await new Msg(req, res, "192").Inbox();
});

//@desc List All Somtel
// Route GET /somtel
//@access Privite
const listSom = asyncHandler(async (req, res) => {
  await new Msg(req, res, "Reseller").Inbox();
});

//@desc view inbox deitals info
// Route GET /inbox/viw/:id
//@access Privite
const inboxView = asyncHandler(async (req, res) => {
  await new Msg(req, res).Details();
});

//@desc Update send delete register
// Route POST /inbox/update
//@access Privite
const inboxUpdate = asyncHandler(async (req, res) => {
  await new Msg(req, res).Post();
});

module.exports = {
  listHor,
  listSom,
  inboxView,
  inboxUpdate,
};
