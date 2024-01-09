const {
  checksNtijo,
  findCostumers,
  isLastTransSucc,
} = require("../models/others/shaqo");

const waiting = async (req, res, next) => {
  const filter = await Text(req.body.list);
  const nt = await checksNtijo(filter[1].c, req.user.user_id);
  if (nt == "not") {
      res.status(404).json("not");
    } else {
      const mc = await isLastTransSucc(filter[1].c, req.user.user_id);
      if (mc == "not") {
        res.status(404).json("not");
      } else {
        req.time = mc.created_at;
        req.macaamiill = nt;
        req.amount = mc.amount;
        next();
      }
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

module.exports = waiting;
