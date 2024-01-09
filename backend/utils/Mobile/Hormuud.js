const { FindDiidmo } = require("../../func/adeega");
const { FindHorOrSom } = require("../../func/costumers");
const { InserMsgs } = require("../../func/inbox");
const { InserDalab } = require("../../func/transections");
const { isAmounts } = require("../../func/types");
const Types = require("../Type/Types");

class Hormuud {
  constructor(req, res, number, amount) {
    this.req = req;
    this.res = res;
    this.number = number;
    this.amount = amount;
  }

  async Hormuud() {
    return await this.Send();
  }

  async Costumers() {
    const cos = await FindHorOrSom(this.req.user.user_id, this.number);
    return {
      costumer: cos,
      amount: this.amount,
    };
  }
  async Send() {
    const cos = await this.Costumers();
    const nowDate = new Date();
    const profit = (18 / 118) * this.amount;
    const ressults = profit.toFixed(2);
    if (cos.costumer.cid) {
      const other = await new Types(cos.costumer.types, cos.amount).Types();
      if (other.adeega == "") {
        if (this.req.user.annknown == "yes") {
          await InserMsgs(
            this.req.body,
            this.req.user.user_id,
            "mobile",
            cos.costumer.cid
          );
          this.res.status(404).json("not");
        } else {
          this.res.status(404).json("not");
        }
      } else {
        const diidmo = await FindDiidmo(
          this.req.user.user_id,
          other.type.nooca,
          other.adeega.amount
        );
        if (diidmo.id) {
          this.res.status(404).json("not");
        } else {
          const transection = [
            this.req.user.user_id,
            cos.costumer.cid,
            cos.costumer.name,
            cos.costumer.h_number,
            cos.costumer.s_number,
            cos.costumer.types,
            this.amount,
            ressults,
            "pending",
            nowDate,
          ];
          const xaalada = "valid";
          await InserDalab(transection);
          await InserMsgs(
            this.req.body,
            this.req.user.user_id,
            xaalada,
            cos.costumer.cid
          );
          const v = `${other.type.starts + cos.costumer.s_number}*${
            other.adeega.send
          }*${this.req.user.pin}#`;
          this.res.status(200).json(v);
        }
      }
    } else {
      if (this.req.user.annknown == "yes") {
        const a = await isAmounts(cos.amount);
        if (a == "") {
          this.res.status(404).json("not");
        } else {
          await InserMsgs(this.req.body, this.req.user.user_id, "other", 0);
          this.res.json("not");
        }
      } else {
        this.res.status(404).json("not");
      }
    }
  }
  async Xanibaad() {
    const c = await this.Costumers();
    if (c.costumer.cid) {
      await InserMsgs(
        this.req.body,
        this.req.user.user_id,
        "xanibaad",
        c.costumer.cid
      );
      this.res.status(404).json("not");
    } else {
      this.res.status(404).json("not");
    }
  }
}

module.exports = Hormuud;
