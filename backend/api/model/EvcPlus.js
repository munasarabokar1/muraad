const { findClient } = require("../function/user");
const Send = require("../mobile/models/routes/send");

class EvcPlus {
  constructor(client, data) {
    this.client = client;
    this.data = data;
  }
  async Get() {
    const c = await findClient(this.client);
    if (c != "not") {
      const sms = await new Send(c, this.data.msg).Sender();
      return sms;
    } else {
      return "not";
    }
  }
}

module.exports = EvcPlus;
