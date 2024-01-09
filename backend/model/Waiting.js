const { listgetNode, FindgetNodeId, delGetNode } = require("../func/getnode");

class Waiting {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async All() {
    this.res.status(200).json(await listgetNode(this.req.user.user_id));
  }
  async Details() {
    const r = await FindgetNodeId(this.req.params.id, this.req.user.user_id);
    if (r != "") {
      this.res.status(200).json(r);
    } else {
      this.res.status(404).json("not found");
    }
  }
  async Del() {
    this.res
      .status(200)
      .json(await delGetNode(this.req.body.id, this.req.user.user_id));
  }
}

module.exports = Waiting;
