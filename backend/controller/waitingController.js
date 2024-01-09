const asyncHandler = require("express-async-handler");
const Waiting = require("../model/Waiting");

//@desc List All Waiting list
// Route GET /waiting/
//@access Privite
const listWaiting = asyncHandler(async (req, res) => {
  await new Waiting(req, res).All();
});

//@desc view waiting deitals info
// Route GET /wait/:id
//@access Privite
const waitingView = asyncHandler(async (req, res) => {
  await new Waiting(req, res).Details();
});

//@desc ddelete waiting
// Route POST /waiting/del
//@access Privite
const delWaiting = asyncHandler(async (req, res) => {
  await new Waiting(req, res).Del();
});

module.exports = {
  listWaiting,
  waitingView,
  delWaiting,
};
