const { FindsAdeega, FindsAll, FindDiidmo } = require("../../func/adeega");

class Adeega {
  constructor(nooca, amount, user_id) {
    this.nooca = nooca;
    this.amount = amount;
    this.user_id = user_id;
  }

  async Nooca() {
    return await FindsAdeega(this.nooca, this.amount);
  }

  async All() {
    return await FindsAll(this.nooca);
  }
  async isActive() {
    return await FindDiidmo(this.user_id, this.nooca, this.amount);
  }
}

module.exports = Adeega;
