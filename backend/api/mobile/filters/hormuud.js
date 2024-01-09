const Hormuud = require("../models/functions/hor");
const Xanibaad = require("../models/functions/xanibaad");
const {
  checksNtijo,
  findCostumers,
  findUnknowTypes,
} = require("../models/others/shaqo");

const evcplus = async (req, res, next) => {
  if (req.body.sender != "192") {
    res.json("not");
  } else {
    const filter = await Text(req.body.list);
    const heshay = await findUnknowTypes(req.body.list, "waxaad");
    const xanibaad = await findUnknowTypes(req.body.list, "xanibay");
    const succeeded = await findUnknowTypes(req.body.list, "succeeded");

    if (heshay == "waxaad") {
      const hor = await new Hormuud(
        filter[2].c.substring(1),
        filter[1].c + " ",
        req.user,
        req.body
      ).Hormuud();
      res.json(hor);
    } else if (xanibaad == "xanibay") {
      const rr = await new Xanibaad(
        req.body,
        filter[4].c.substring(3),
        req.user
      ).Xanibaad();

      res.json(rr);
    } else if (succeeded == "succeeded") {
      const amount =
        filter[1].c + filter[2].c == "1..5" ? "0.5 " : filter[2].c + " ";
      const hor = await new Hormuud(
        filter[3].c.substring(3),
        amount,
        req.user,
        req.body
      ).Hormuud();
      res.json(hor);
    } else {
      res.json("not");
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

module.exports = evcplus;
