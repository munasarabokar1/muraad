const { updateUsers, listUser } = require("../func/users");
const bcrypt = require("bcryptjs");
class Users {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async List() {
    const tr = await listUser();
    const { q } = this.req.query;
    const keys = ["full_name"];
    const raadi = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    q
      ? this.res.status(200).json(raadi(tr).splice(0, 10))
      : this.res.status(200).json(tr.slice(0, 10));
  }
  async UpdateUser() {
    if (this.req.body?.password) {
      // change password
      return await this.Password();
    } else if (this.req.body.pin) {
      //  change reseller pin
      return await this.Reseller();
    } else if (this.req.body.device) {
      //  change device ID
      return await this.Device();
    } else {
      // do nothing
      this.res.status(404).json("xad ki loogu talagay waad dhaaftay");
    }
  }
  async Password() {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.req.body.password, salt);
    this.res.json(
      await updateUsers("user_password", this.req.user.user_id, hashPassword)
    );
  }
  async Reseller() {
    this.res.json(
      await updateUsers("pin", this.req.user.user_id, this.req.body.pin)
    );
  }
  async Device() {
    this.res.json(
      await updateUsers("deviceid", this.req.user.user_id, this.req.body.device)
    );
  }
}

module.exports = Users;
