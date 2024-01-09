const { CostDetails, FindHorOrSom, addCotsumer } = require("../func/costumers");
const { filterText } = require("../func/filter");
const { FindgetNode } = require("../func/getnode");
const { ListInB, inBoxDetails, delInB } = require("../func/inbox");
const { sendTransectionNow } = require("../func/transections");
const Types = require("../utils/Type/Types");

class Msg {
  constructor(req, res, sender) {
    this.req = req;
    this.res = res;
    this.sender = sender;
  }
  // list all
  async Inbox() {
    const inb = await ListInB(this.req.user.user_id, this.sender, "valid");
    const { q } = this.req.query;
    const keys = ["body"];
    const raadi = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    q
      ? this.res.status(200).json(raadi(inb).splice(0, 10))
      : this.res.status(200).json(inb.slice(0, 10));
  }
  // view details
  async Details() {
    const r = await inBoxDetails(this.req.params.id, this.req.user.user_id);
    if (r != "") {
      const cos_id = await CostDetails(r.cos_id, this.req.user.user_id);
      const filter = await filterText(r.body);
      this.res.status(200).json({
        msg: r,
        cos: cos_id,
        number: filter[2].c.substring(1),
        amount: filter[1].c + " ",
      });
    } else {
      this.res.status(404).json(r);
    }
  }
  // post method center
  async Post() {
    if (this.req.body?.sent) {
      // register and send and del msg
      return await this.Send();
    } else {
      // del msg only
      this.res.status(200).json(await this.Del());
    }
  }
  //add user
  async Create() {
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
      return "oke";
    } else {
      return c;
    }
  }
  // del msg
  async Del() {
    return await delInB(this.req.body.id, this.req.user.user_id);
  }
  // send transection
  async Send() {
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
        this.req.body.som,
        "*" + other.adeega.send + "*",
        xx,
        nowDate,
      ];
      const c = await FindgetNode(
        this.req.body.number,
        "*" + other.adeega.send + "*"
      );
      if (c == "") {
        const u = await this.Create();
        if (u == "oke") {
          await this.Del();
          this.res.status(200).json(await sendTransectionNow(value));
        } else {
          return u;
        }
      } else {
        this.res.status(404).json("Adeegan horey ayaa u dalbatay ..");
      }
    }
  }
  // find exist number
  async Hormuud() {
    const r = await FindHorOrSom(this.req.body.hor, this.req.user.user_id);
    if (r == "") {
      return "oke";
    } else {
      this.res.status(404).json("number kan horey ayaa loo diiwaan galiyay");
    }
  }
}

module.exports = Msg;
