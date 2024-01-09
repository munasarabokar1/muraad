const { findCostumers, InserMsgs } = require("../others/shaqo");

class Xanibaad {
  constructor(body, number, user) {
    this.body = body;
    this.number = number;
    this.user = user;
  }
  async Xanibaad() {
    const nowDate = new Date();
    const macaamiil = await findCostumers(this.number, this.user.user_id);
    const rr =
      macaamiil == "not"
        ? "not"
        : await InserMsgs([
            this.user.user_id,
            this.body.sender,
            this.body.list,
            "xanibaad",
            macaamiil.cid,
            nowDate,
          ]);
    return "not";
  }
}

module.exports = Xanibaad;
