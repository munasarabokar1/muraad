const check = require("../functions/check.js");
const Fake = require("../others/fake.js");
const { getMsgs } = require("../others/shaqo.js");

class Inbox {
  constructor(device, types) {
    this.device = device;
    this.types = types;
  }
  async Msg() {
    const checks = new check(this.device);
    const resluts = await checks.Checking();
    const fake = new Fake(resluts[0].user_id);
    const rr =
      resluts[0].user_name == "fake"
        ? fake.Msgs()
        : getMsgs(resluts[0].user_id, this.types);
    return rr;
  }
}

module.exports = Inbox;
