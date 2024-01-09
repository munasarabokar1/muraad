const asyncHandler = require("express-async-handler");
const Costmers = require("../model/Costumers");

//@desc List All Costumers
// Route GET /costs
//@access Privite
const listCs = asyncHandler(async (req, res) => {
  await new Costmers(req, res).ListCost();
});

//@desc view Costumers info
// Route GET /costs/view/:id
//@access Privite
const costsView = asyncHandler(async (req, res) => {
  await new Costmers(req, res).GetDetails();
});

//@desc Add new Costumer
// Route Post /cost/add
//@access Privite
const postAdd = asyncHandler(async (req, res) => {
  await new Costmers(req, res).Add();
});

//@desc Update Costumers all method and send money
// Route Post /cost/update
//@access Privite
const postCs = asyncHandler(async (req, res) => {
  await new Costmers(req, res).Post();
});

module.exports = {
  listCs,
  postCs,
  costsView,
  postAdd,
};
