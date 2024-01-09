const { FindUser, CreateUsers } = require("../func/users");
const bcrypt = require("bcryptjs");
class CreateUser {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async CreateUser() {
    var date = new Date();
    const { fullname, username, password, mobile, deegaan, exp } =
      this.req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const r = await CreateUsers([
      username,
      hash,
      "0000",
      fullname,
      mobile,
      deegaan,
      "subscriber",
      "no",
      "0.00",
      "active",
      date,
      new Date(Date.now() + exp * 24 * 60 * 60 * 1000),
    ]);
    if (r != 1) {
      this.res.status(404);
      throw new Error(r);
    }
    this.res.status(200).json("User Has been created ");
  }
}

module.exports = CreateUser;
