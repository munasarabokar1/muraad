const { findClient } = require("../function/user");
const ResellerFilter = require("../mobile/filters/reseller");
const WaitingListFilter = require("../mobile/filters/waiting");

class SomtelCLient {
  constructor(client, data) {
    this.client = client;
    this.data = data;
  }

  async Reseller() {
    const c = await findClient(this.client);
    if (c != "not") {
      return await new ResellerFilter(c, this.data.msg).Filtering();
    } else {
      return "not";
    }
  }
  async Waiting() {
    const c = await findClient(this.client);
    if (c != "not") {
      return await new WaitingListFilter(c, this.data.msg).Filtering();
    } else {
      return "not";
    }
  }
}

module.exports = SomtelCLient;
