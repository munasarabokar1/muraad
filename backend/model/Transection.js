const { insertComment } = require("../func/comment");
const { FindgetNode } = require("../func/getnode");
const {
  TransDetails,
  updateTrans,
  sendTransectionNow,
  ListTrans,
} = require("../func/transections");
const Types = require("../utils/Type/Types");

class Transection {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async List() {
    const tr = await ListTrans(this.req.user.user_id);
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
  async GetDetails() {
    const r = await TransDetails(this.req.params.id, this.req.user.user_id);
    if (r?.id) {
      this.res.status(200).json(r);
    } else {
      this.res.status(404).json(r);
    }
  }
  async PostDetails() {
    const r = await TransDetails(this.req.body.id, this.req.user.user_id);
    if (r?.id) {
      return r;
    } else {
      this.res.status(404).json(r);
    }
  }
  async Post() {
    if (this.req.body?.resent) {
      // resend function
      return await this.ReSend();
    } else if (this.req.body?.sent) {
      return await this.IsSent();
    } else if (this.req.body?.cancle) {
      return await this.Cancle();
    } else {
      this.res.status(404).json("some thing went wrong");
    }
  }
  async ReSend() {
    const s = await this.PostDetails();
    if (s?.id) {
      const other = await new Types(s.types, s.amount).Types();
      const xx = this.req.body.waqti == "" ? "pending" : "waiting";
      const nowDate =
        this.req.body.waqti == "" ? new Date() : this.req.body.waqti;
      const value = [
        this.req.user.user_id,
        other.type.starts,
        s.s_number,
        "*" + other.adeega.send + "*",
        xx,
        nowDate,
      ];

      const c = await FindgetNode(s.s_number, "*" + other.adeega.send + "*");
      if (c == "") {
        this.res.status(200).json(await sendTransectionNow(value));
      } else {
        this.res.status(404).json("Adeegan horey ayaa u dalbatay ..");
      }
    } else {
      this.res.status(404).json("not found");
    }
  }
  async IsSent() {
    const s = await this.PostDetails();
    if (s?.id) {
      const status = "success";
      const comment = "si automatic ah ayey ugu dhacday waana la xaqiijiyay";
     // await insertComment([s.id, comment]);
      this.res.status(200).json(await updateTrans(status, s.id));
    } else {
      this.res.status(404).json("not found");
    }
  }
  async Cancle() {
    const s = await this.PostDetails();
    if (s?.id) {
      const status = "canceled";
      const comment = "Dalabkaan waa lala noqday waana la cancle gareeyay";
   //   await insertComment([s.id, comment]);
      this.res.status(200).json(await updateTrans(status, s.id));
    } else {
      this.res.status(404).json("not found");
    }
  }
}

module.exports = Transection;
