const check = require("../functions/check.js");
const {
  updateNotts,
  delNotification,
  findNotification,
  updateExp,
} = require("../others/shaqo.js");

class Notification {
  constructor(user) {
    this.user = user;
  }

  async Find() {
    const find = findNotification(this.user.user_id);
    return find;
  }
  async Notification() {
    const nowDate = new Date();
    const find = await this.Find();
    const value = `${
      find.types + find.numbers + find.amounts + this.user.pin
    }#`;
    if (find.xaalada == "pending") {
      await delNotification(find.id);
      await this.Exp();
      return value;
    } else if (find.xaalada == "waiting") {
      if (nowDate > find.send_time) {
        await updateNotts(find.id);
        await this.Exp();
        return "not";
      } else {
        await this.Exp();
        return "not";
      }
    } else {
      await this.Exp();
      return "not";
    }
  }
  async Exp() {
    const nowDate = new Date();
    if (this.user.role == "subscriber") {
      if (nowDate > this.user.expiretime) {
        const rr = await updateExp(this.user.user_id);
        return rr;
      } else {
        return nowDate;
      }
    } else {
      return "not s";
    }
  }
}

module.exports = Notification;
