const check = require("../functions/check.js");
const {
  updateNotts,
  delNotification,
  InsertLast,
  UpdateLastSeen,
  findNotification,
  findLastSeen,
  updateExp,
} = require("../others/shaqo.js");

class Notification {
  constructor(device) {
    this.device = device;
  }
  async Device() {
    const checks = new check(this.device);
    const rr = await checks.Checking();
    const resluts = rr[0].user_name == "fake" ? "not" : await checks.Checking();
    return resluts;
  }
  async Find() {
    const check = await this.Device();
    if (check[0].user_id) {
      const find = findNotification(check[0].user_id);
      return find;
    } else {
      return "not";
    }
  }

  async LastSeen() {
    const check = await this.Device();
    if (check[0].user_id) {
      const find = await findLastSeen(check[0].user_id);
      const insert =
        find == "last"
          ? await InsertLast(check[0].user_id)
          : await UpdateLastSeen(check[0].user_id);
      return insert;
    } else {
      return "not";
    }
  }
  async Notification() {
    const nowDate = new Date();
    const check = await this.Device();
    if (check[0].user_id) {
      const find = await this.Find();
      const value = `${
        find.types + find.numbers + find.amounts + check[0].pin
      }#`;
      if (find.xaalada == "pending") {
        await delNotification(find.id);
        await this.Exp();
        this.LastSeen(check[0].user_id);
        return value;
      } else if (find.xaalada == "waiting") {
        if (nowDate > find.send_time) {
          await updateNotts(find.id);
          await this.Exp();
          this.LastSeen(check[0].user_id);
          return "not";
        } else {
          this.LastSeen(check[0].user_id);
          await this.Exp();
          return "not";
        }
      } else {
        this.LastSeen(check[0].user_id);
        await this.Exp();
        return "not";
      }
    } else {
      return "not";
    }
  }
  async Exp() {
    const nowDate = new Date();
    const check = await this.Device();
    if (check.role == "subscriber") {
      if (nowDate > check[0].expiretime) {
        const rr = await updateExp(check[0].user_id);
        return rr;
      } else {
        return "not";
      }
    } else {
      return "not";
    }
  }
}

module.exports = Notification;
