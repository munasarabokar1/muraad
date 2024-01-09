const asyncHandler = require("express-async-handler");
const Transection = require("../model/Transection");

//@desc view Transections
// Route GET /trans/view/id
//@access Privite
const transView = asyncHandler(async (req, res) => {
  await new Transection(req, res).GetDetails();
});

//@desc List All Transections
// Route GET /tran
//@access Privite
const listTr = asyncHandler(async (req, res) => {
  await new Transection(req, res).List();
});

//@desc Re send and Make success and cancle Transection
// Route Post /trans/view/id
//@access Privite
const postTrans = asyncHandler(async (req, res) => {
  await new Transection(req, res).Post();
});

module.exports = {
  transView,
  postTrans,
  listTr,
};
