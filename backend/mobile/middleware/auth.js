const CheckUser = require("../models/functions/check");

const authSystem = async (req, res, next) => {
  const c = await new CheckUser(req.params.deviceid).Checking();
  if (c[0].user_name != "fake") {
    req.user = c[0];
    next();
  } else {
    res.status(404).json("not");
  }
};

module.exports = authSystem;
