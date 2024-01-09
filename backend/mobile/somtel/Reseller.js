const {
  InserDalab,
  insertComment,
  updateBalence,
  updateNtjjo,
  InserMsgs,
} = require("../models/others/shaqo");

class Resselers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async Somtel() {
    if (this.req.type == "yes") {
      await this.Update();
    } else {
      await this.Send();
    }
  }
  async Send() {
    const profit = (18 / 118) * this.req.amount;
    const ressulting = profit.toFixed(2);
    const nowDate = new Date();
    const value = [
      this.req.user.user_id,
      this.req.macaamiil.cid,
      this.req.macaamiil.name,
      this.req.macaamiil.h_number,
      this.req.macaamiil.s_number,
      this.req.macaamiil.types,
      this.req.amount,
      ressulting,
      "success",
      nowDate,
    ];
    await InserDalab(value);
    this.Balance();
    this.res.json("oke");
  }
  async Update() {
    const nowDate = new Date();
    const comment = " Si automatic ah ayey ugu dhacday waana la xaqiijiyay";
    await insertComment(comment, this.req.macaamiil.id);
    await InserMsgs(
      this.req.body,
      this.req.user.user_id,
      "valid",
      this.req.macaamiil.cos_id
    );
    await updateNtjjo(this.req.macaamiil.id, nowDate);
    await this.Balance();
    this.res.json("oke");
  }
  async Balance() {
    const rr = await updateBalence(this.req.user.user_id, this.req.balance);
    return "oke";
  }
}
module.exports = Resselers;
