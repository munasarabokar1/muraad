const {
  InserMsgs,
  updateNtjjo,
  checksNtijo,
  insertComment,
  findCostumers,
  InserDalab,
  updateBalence,
} = require("../others/shaqo");

class Somtel {
  constructor(number, amount, balance, body, user) {
    this.number = number;
    this.amount = amount;
    this.body = body;
    this.balance = balance;
    this.user = user;
  }
  Somtel() {
    return this.Update();
  }
  async Check() {
    const check = await checksNtijo(this.number);
    return check;
  }

  async Update() {
    const profit = (18 / 118) * this.amount;
    const ressulting = profit.toFixed(2);
    const nowDate = new Date();
    const id = await this.Check();

    const comment = " Si automatic ah ayey ugu dhacday waana la xaqiijiyay";
    if (id == "not") {
      const macaamiil = await findCostumers(this.number, this.user.user_id);
      if (macaamiil == "not") {
        return "not";
      } else {
        const value = [
          this.user.user_id,
          macaamiil.cid,
          macaamiil.name,
          macaamiil.h_number,
          macaamiil.s_number,
          macaamiil.types,
          this.amount,
          ressulting,
          "success",
          nowDate,
        ];
        await InserDalab(value);
        this.Balance();
        return "oke";
      }
    } else {
    //  await insertComment(comment, id.id);
      await InserMsgs(this.body, this.user.user_id, "valid", id.cos_id);
      await updateNtjjo(id.id, nowDate);
      this.Balance();
      return "oke";
    }
  }
  async Balance() {
    const rr = await updateBalence(this.user.user_id, this.balance);
    return "oke";
  }
}
module.exports = Somtel;
