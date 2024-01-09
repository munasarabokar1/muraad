const {
  FindsAll,
  FindsAdeegaId,
  delDiidmo,
  insertDiidmo,
} = require("../func/adeega");
const Adeega = require("../utils/Adeega/Adeega");

class Adeegga {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async List() {
    if (
      this.req.params.type == "dhammeys" ||
      this.req.params.type == "abaal" ||
      this.req.params.type == "voice"
    ) {
      this.res.status(200).json(await FindsAll(this.req.params.type));
    } else {
      this.res.status(404).json("not found");
    }
  }
  async Details() {
    const t = await FindsAdeegaId(this.req.params.type, this.req.params.id);
    if (t != "") {
      const f = await new Adeega(
        this.req.params.type,
        t.amount,
        this.req.user.user_id
      ).isActive();
      if (f != "") {
        this.res.status(200).json({
          t,
          r: "not active",
        });
      } else {
        this.res.status(200).json({
          t,
          r: "active",
        });
      }
    } else {
      this.res.status(404).json("not found");
    }
  }

  async Update() {
    const t = await FindsAdeegaId(this.req.body.type, this.req.body.id);
    if (t != "") {
      const f = await new Adeega(
        this.req.body.type,
        t.amount,
        this.req.user.user_id
      ).isActive();
      if (f != "") {
        this.res.status(200).json(await delDiidmo(f.id));
      } else {
        const v = [this.req.body.type, t.amount, this.req.user.user_id];
        this.res.status(200).json(await insertDiidmo(v));
      }
    } else {
      this.res.status(404).json("not found");
    }
  }
}

module.exports = Adeegga;
