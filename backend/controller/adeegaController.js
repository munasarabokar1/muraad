const asyncHandler = require("express-async-handler");
const Adeegga = require("../model/Adeega");

//@desc List All Adeega
// Route GET /adeega/:type
//@access Privite
const listAdeega = asyncHandler(async (req, res) => {
  await new Adeegga(req, res).List();
});

//@desc view adeega deitals info
// Route GET /adeegga/:type/:id
//@access Privite
const addeegaView = asyncHandler(async (req, res) => {
  await new Adeegga(req, res).Details();
});

//@desc update adeeg yada
// Route POST /adeegyada/update
//@access Privite
const addeegaUpdate = asyncHandler(async (req, res) => {
  await new Adeegga(req, res).Update();
});

module.exports = { listAdeega, addeegaView, addeegaUpdate };
