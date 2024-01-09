const {
  ListCosts,
  updateCotsumer,
  updateStatus,
  CostDetails,
  addCotsumer,
  FindHorOrSom,
  FindHorOr,
} = require("../func/costumers");
const { FindgetNode } = require("../func/getnode");
const { sendTransectionNow, ListTrans } = require("../func/transections");
const Types = require("../utils/Type/Types");

class Costmers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async ListCost() {
    const tr = await ListCosts(this.req.user.user_id);
    const { q } = this.req.query;
    const keys = ["h_number", "s_number"];
    const raadi = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    q
      ? this.res.status(200).json(raadi(tr).splice(0, 10))
      : this.res.status(200).json(tr.slice(0, 10));
  }
  async Add() {
    const { name, hor, som, type } = this.req.body;
    const c = await this.Hormuud();
    if (c == "oke") {
      const v = [
        this.req.user.user_id,
        name,
        hor.toString(),
        som.toString(),
        type,
      ];
      const i = await addCotsumer([v]);
      this.res.status(200).json(i);
    } else {
      return c;
    }
  }
  async GetDetails() {
    const r = await CostDetails(this.req.params.id, this.req.user.user_id);
    if (r != "") {
      const other = await new Types(r.types).All();
      this.res.status(200).json({ user: r, type: other });
    } else {
      this.res.status(404).json(r);
    }
  }
  async Post() {
    if (this.req.body?.xaalada) {
      // update status
      return await this.UpdateStatus();
    } else if (this.req.body?.sent) {
      //send transection
      return await this.ReSend();
    } else {
      // update info
      return await this.UpdateInfo();
    }
  }
  async UpdateInfo() {
    const { name, hor, som, type, id } = this.req.body;
    const cos = await CostDetails(id, this.req.user.user_id);
    const r = await FindHorOr(this.req.body.hor, this.req.user.user_id);
    if (r == "" || cos.h_number == hor) {
      this.res.status(200).json(await updateCotsumer(name, hor, som, type, id));
    } else {
      this.res.status(404).json("Hormuud ka horey ayuu u diiwan gashnaa !!");
    }
  }
  async UpdateStatus() {
    this.res
      .status(200)
      .json(await updateStatus(this.req.body.xaalada, this.req.body.id));
  }
  async ReSend() {
    const other = await new Types(
      this.req.body.type,
      this.req.body.amount
    ).Types();
    if (other.adeega.amount != this.req.body.amount) {
      this.res.status(404).json("Howshaan laguma guuleesanin");
    } else {
      const xx = this.req.body.waqti == "" ? "pending" : "waiting";
      const nowDate =
        this.req.body.waqti == "" ? new Date() : this.req.body.waqti;
      const value = [
        this.req.user.user_id,
        other.type.starts,
        this.req.body.number,
        "*" + other.adeega.send + "*",
        xx,
        nowDate,
      ];
      const c = await FindgetNode(
        this.req.body.number,
        "*" + other.adeega.send + "*"
      );
      if (c == "") {
        this.res.status(200).json(await sendTransectionNow(value));
      } else {
        this.res.status(404).json("Adeegan horey ayaa u dalbatay ..");
      }
    }
  }
  async Hormuud() {
    const r = await FindHorOr(this.req.body.hor, this.req.user.user_id);
    if (r == "") {
      return "oke";
    } else {
      this.res.status(404).json("Hormuud ka horey ayuu u diiwan gashnaa !!");
    }
  }
}

module.exports = Costmers;
