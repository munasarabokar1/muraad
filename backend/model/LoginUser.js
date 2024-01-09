const { FindUser } = require("../func/users");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
class LoginUser {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async Login() {
    if (await this.isFind()) return await this.isFind();
    if (await this.isCompare()) return await this.isFind();
    this.res.status(200).json(await this.isUser());
  }
  async isUser() {
    const user = await FindUser(this.req.body.username);
    generateToken(this.res, user.user_id);
    return user;
  }
  async isFind() {
    if (await FindUser(this.req.body.username)) {
      return;
    } else {
      this.res.status(404);
      throw new Error("username or password is incorrect");
    }
  }
  async isCompare() {
    const user = await FindUser(this.req.body.username);
    const match = bcrypt.compareSync(
      this.req.body.password,
      user.user_password
    );
    if (match == false) {
      this.res.status(404);
      throw new Error("username or password is incorrect");
    } else {
      return;
    }
  }
}

module.exports = LoginUser;
