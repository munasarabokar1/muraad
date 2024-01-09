class Somtel {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async Somtel() {
    this.res.json("somtel");
  }
}

module.exports = Somtel;
