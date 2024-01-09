const { FindUser } = require("../others/shaqo");

module.exports = class CheckUser {
  constructor(device) {
    this.device = device;
  }
  Checking() {
    const check = FindUser(this.device);
    return check;
  }
};
