const {
  isLastTransSucc,
  selectTypes,
  selecAmouts,
  sendTransectionNow,
  checksNtijo,
} = require("../others/shaqo");

class Waiting {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  isAmount() {
    const ammount = [
      {
        ammount: "0.50",
        send: "05",
        nooca: "1",
      },
      {
        ammount: "1.00",
        send: "1",
        nooca: "2",
      },
      {
        ammount: "3.00",
        send: "3",
        nooca: "7",
      },
      {
        ammount: "5.00",
        send: "5",
        nooca: "7",
      },
      {
        ammount: "15.00",
        send: "15",
        nooca: "31",
      },
    ];
    return ammount;
  }

  async FindType() {
    const rr = selectTypes(this.req.macaamiill.types);
    return rr;
  }
  async isFix() {
    return Number.parseFloat(this.req.macaamiill.amount).toFixed(0);
  }
  async FindAmount() {
    const istype = await this.FindType();
    if (istype == "not") return "not";
    const ammount = await selecAmouts(istype.nooca, this.req.amount);
    return ammount;
  }
  async isUserAmount() {
    const istype = await this.FindType();
    if (istype == "not") return "not";
    const ammount = await selecAmouts(istype.nooca, this.req.macaamiill.amount);
    return ammount;
  }
  async isUserTime() {
    const aa = this.isAmount();
    const ff = await this.isUserAmount();
    if (ff != "not") return ff;
    const object = aa.find((a) => a.ammount === this.req.macaamiill.amount);
    return object;
  }
  async isSendTime() {
    const aa = this.isAmount();
    const ff = await this.FindAmount();
    if (ff != "not") return ff;
    const object = aa.find((a) => a.ammount === this.req.amount);
    return object;
  }
  async AddTime() {
    const a = await this.isSendTime();
    if (a == "not") return "not";
    const oneDayInMs = 86450 * 1000;
    const tt = new Date(Date.parse(this.req.time) + a.nooca * oneDayInMs);
    return tt;
  }
  async Send() {
    const type = await this.FindType();
    const amount = await this.isUserTime();
    const time = await this.AddTime();
    const value = [
      this.req.user.user_id,
      type.starts,
      this.req.macaamiill.s_number,
      "*" + amount.send + "*",
      "waiting",
      time,
    ];
    await sendTransectionNow(value);
    return "oke";
  }
  async isTIme() {
    const time = await this.AddTime();
    const nowDate = new Date();
    if (nowDate > time) {
      return "not";
    }
    return await this.Send();
  }

  async Waiting() {
    this.res.json(await this.isTIme());
  }
}

module.exports = Waiting;
