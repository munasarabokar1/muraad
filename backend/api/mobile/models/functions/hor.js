const {
  amountsCheck,
  selecAmouts,
  selectTypes,
  InserMsgs,
  InserDalab,
  findCostumers,
  IsBanned,
} = require("../others/shaqo");

class Hormuud {
  constructor(number, amount, user, body) {
    this.number = number;
    this.amount = amount;
    this.user = user;
    this.body = body;
  }
  async Hormuud() {
    const annknown =
      this.user.annknown == "yes"
        ? await this.Annknown()
        : await this.WithKnown();

    if (annknown == "not") {
      return "not";
    } else {
      return await this.SendTime();
    }
  }
  FindCostumer() {
    const rr = findCostumers(this.number, this.user.user_id);
    return rr;
  }
  async FindType() {
    const find = await this.FindCostumer();
    const rr = selectTypes(find.types);
    if (find == "not") return "not";
    return rr;
  }
  async isBanned() {
    const type = await this.FindType();
    if (type == "not") return "not";
    const r = await IsBanned(this.amount, this.user.user_id, type.nooca);
    return r;
  }
  async FindAmount() {
    const isban = await this.isBanned();
    if (isban != "not") return "not";
    const type = await this.FindType();
    const ammount = await selecAmouts(type.nooca, this.amount);
    return ammount;
  }
  async FindAll() {
    const macaamiil = await this.FindCostumer();
    const amount = await this.FindAmount();
    const typing = await this.FindType();
    return { macaamiil, typing, amount };
  }
  async SendTime() {
    const nowDate = new Date();
    const ff = await this.FindAll();
    if (ff.typing == "not") return "not";
    const profit = (18 / 118) * this.amount;
    const ressults = profit.toFixed(2);
    const transection = [
      this.user.user_id,
      ff.macaamiil.cid,
      ff.macaamiil.name,
      ff.macaamiil.h_number,
      ff.macaamiil.s_number,
      ff.macaamiil.types,
      this.amount,
      ressults,
      "pending",
      nowDate,
    ];
    await InserMsgs([
      this.user.user_id,
      this.body.sender,
      this.body.list,
      "valid",
      ff.macaamiil.cid,
      nowDate,
    ]);
    await InserDalab(transection);
    return `${ff.typing.starts}${ff.macaamiil.s_number}*${ff.amount.send}*${this.user.pin}#`;
  }
  async WithKnown() {
    const macaamiil = await this.FindCostumer();
    const amount = await this.FindAmount();
    const type = await this.FindType();
    if (!macaamiil.cid && amount.id) {
      return "not";
    } else if (macaamiil.cid && !amount.id) {
      return "not";
    } else if (!macaamiil.cid && !amount.id) {
      return "not";
    } else {
      return "oke";
    }
  }
  async Amounts() {
    const r = await amountsCheck(this.amount);
    return r;
  }
  async Annknown() {
    const nowDate = new Date();
    const macaamiil = await this.FindCostumer();
    const amountDefault = await this.Amounts();
    const type = await this.FindType();
    if (!macaamiil.cid && amountDefault.id) {
      await InserMsgs([
        this.user.user_id,
        this.body.sender,
        this.body.list,
        "other",
        0,
        nowDate,
      ]);
      return "not";
    } else {
      const ammount = await this.FindAmount();
      if (ammount == "not") {
        await InserMsgs([
          this.user.user_id,
          this.body.sender,
          this.body.list,
          "mobile",
          macaamiil.cid,
          nowDate,
        ]);
        return "not";
      } else {
        return "oke";
      }
    }
  }
}
// end
module.exports = Hormuud;
