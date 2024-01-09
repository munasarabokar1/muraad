const { checksNtijo, findCostumers } = require("../models/others/shaqo");
const { ResselersSend, ResselersUpdate } = require("../somtel/Reseller");
class ResellerFilter {
  constructor(user, body) {
    this.body = body;
    this.user = user;
  }
  async Filtering() {
    const filter = await Text(this.body.list);
    const nt = await checksNtijo(filter[1].c, this.user.user_id);
    if (nt == "not") {
      const macaamiil = await findCostumers(filter[1].c, this.user.user_id);
      if (macaamiil == "not") {
        return "not";
      } else {
        return await new ResselersSend(
          this.body,
          this.user,
          macaamiil,
          filter[4].c,
          filter[2].c
        ).Somtel();
      }
    } else {
      return await new ResselersUpdate(
        this.body,
        this.user,
        nt,
        filter[4].c
      ).Somtel();
    }
  }
}
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
module.exports = ResellerFilter;
