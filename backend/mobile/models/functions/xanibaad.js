const { findCostumers, InserMsgs } = require("../others/shaqo");

class Xanibaad {
  constructor(body, number, user) {
    this.body = body;
    this.number = number;
    this.user = user;
  }
  async Xanibaad() {
    const macaamiil = await this.FindCostumer();
    const rr =
      macaamiil == "not"
        ? "not"
        : await InserMsgs(
            this.body,
            this.user.user_id,
            "xanibaad",
            macaamiil.cid
          );
    return "not";
  }
  FindCostumer() {
    const rr = findCostumers(this.number, this.user.user_id);
    return rr;
  }
}

module.exports = Xanibaad;
