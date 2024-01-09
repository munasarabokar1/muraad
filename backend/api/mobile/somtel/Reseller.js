const {
  InserDalab,
  insertComment,
  updateBalence,
  updateNtjjo,
  InserMsgs,
} = require("../models/others/shaqo");

class ResselersUpdate {
  constructor(body, user, macaamiil, balance) {
    this.user = user;
    this.body = body;
    this.macaamiil = macaamiil;
    this.balance = balance;
  }
  async Somtel() {
    const nowDate = new Date();
    const comment = " Si automatic ah ayey ugu dhacday waana la xaqiijiyay";
  //  await insertComment(comment, this.macaamiil.id);
    await InserMsgs([
      this.user.user_id,
      this.body.sender,
      this.body.list,
      "valid",
      this.macaamiil.cos_id,
      nowDate,
    ]);
    await updateNtjjo(this.macaamiil.id, nowDate);
    await updateBalence(this.user.user_id, this.balance);
    return "updated";
  }
}

class ResselersSend {
  constructor(body, user, macaamiil, balance, amount) {
    this.user = user;
    this.body = body;
    this.macaamiil = macaamiil;
    this.balance = balance;
    this.amount = amount;
  }
  async Somtel() {
    const nowDate = new Date();
    const profit = (18 / 118) * this.amount;
    const ressulting = profit.toFixed(2);
    const value = [
      this.user.user_id,
      this.macaamiil.cid,
      this.macaamiil.name,
      this.macaamiil.h_number,
      this.macaamiil.s_number,
      this.macaamiil.types,
      this.amount,
      ressulting,
      "success",
      nowDate,
    ];
    await InserMsgs([
      this.user.user_id,
      this.body.sender,
      this.body.list,
      "valid",
      this.macaamiil.cid,
      nowDate,
    ]);
    await InserDalab(value);
    await updateBalence(this.user.user_id, this.balance);
    return "sended";
  }
}

module.exports = { ResselersUpdate, ResselersSend };
