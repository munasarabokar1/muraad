const Waiting = require("../models/functions/waiting");
const { checksNtijo, isLastTransSucc } = require("../models/others/shaqo");
class WaitingListFilter {
  constructor(user, body) {
    this.body = body;
    this.user = user;
  }
  async Filtering() {
    const filter = await Text(this.body.list);
    const nt = await checksNtijo(filter[1].c, this.user.user_id);
    if (nt == "not") {
      return "not";
    } else {
      const mc = await isLastTransSucc(filter[1].c, this.user.user_id);
      if (mc == "not") {
        return "not";
      } else {
        return await new Waiting(
          this.user,
          mc.amount,
          nt,
          mc.created_at
        ).Waiting();
      }
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

module.exports = WaitingListFilter;
