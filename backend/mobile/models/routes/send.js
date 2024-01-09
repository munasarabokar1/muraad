const check = require("../functions/check.js");
const Hormuud = require("../functions/hor");
const Xanibaad = require("../functions/xanibaad.js");
const { findUnknowTypes } = require("../others/shaqo.js");
class Send {
  constructor(device, body) {
    this.device = device;
    this.body = body;
  }
  async Device() {
    const checks = new check(this.device);
    const rr = await checks.Checking();
    const resluts = rr[0].user_name == "fake" ? "not" : await checks.Checking();
    return resluts;
  }
  Text() {
    const number = this.body.list.replace(/[^0-9\.]+/g, ",");
    var checking = [];
    const words = number.split(",");
    words.forEach(counts);
    function counts(c) {
      checking.push({ c });
    }

    return checking;
  }

  async Sender() {
    const text = this.Text();
    const check = await this.Device();
    if (check[0].user_id) {
      if (this.body.sender == "192") {
        const heshay = await findUnknowTypes(this.body.list, "waxaad");
        const xanibaad = await findUnknowTypes(this.body.list, "xanibay");
        const succeeded = await findUnknowTypes(this.body.list, "succeeded");

        if (heshay == "waxaad") {
          const hor = new Hormuud(
            text[2].c,
            text[1].c + " ",
            check[0],
            this.body
          );
          return await hor.Hormuud();
        } else if (xanibaad == "xanibay") {
          const rr = new Xanibaad(this.body, text[4].c.substring(3), check[0]);

          return rr.Xanibaad();
        } else if (succeeded == "succeeded") {
          const amount =
            text[1].c + text[2].c == "1..5" ? "0.5 " : text[2].c + " ";
          const hor = await new Hormuud(
            text[3].c.substring(3),
            amount,
            check[0],
            this.body
          ).Hormuud();
          return hor;
        } else {
          return "not";
        }
      } else {
        return "not";
      }
    } else {
      return "not";
    }
  }
}

module.exports = Send;
