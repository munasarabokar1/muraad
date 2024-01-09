const { checksNtijo, findCostumers } = require("../models/others/shaqo");

const reseller = async (req, res, next) => {
  const filter = await Text(req.body.list);
  const nt = await checksNtijo(filter[1].c, req.user.user_id);
  if (nt == "not") {
    const macaamiil = await findCostumers(filter[1].c, req.user.user_id);
    if (macaamiil == "not") {
      res.status(404).json("not");
    } else {
      req.macaamiil = macaamiil;
      req.balance = filter[4].c;
      req.amount = filter[2].c;
      req.type = "";
      next();
    }
  } else {
    req.macaamiil = nt;
    req.balance = filter[4].c;
    req.type = "yes";
    next();
  }
};

function Text(body) {
  return new Promise((resolve, reject) => {
    const number = body.replace(/[^0-9\.]+/g, ",");
    var checking = [];
    const words = number.split(",");
    words.forEach(counts);
    function counts(c) {
      checking.push({ c });
    }

    resolve(checking);
  });
}

module.exports = reseller;
