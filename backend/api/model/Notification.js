const { findClient } = require("../function/user");
const Notification = require("../mobile/models/routes/notifications");

class Notifications {
  constructor(client) {
    this.client = client;
  }
  async Get() {
    const currentTime = new Date().getTime(); // Current time in milliseconds
    const c = await findClient(this.client);
    if (c != "not") {
      if(c.role == 'user' && currentTime >  c.expiretime) {
        return "exp";
      } else {
         return await new Notification(c).Notification();
      }
     
      // return "hello";
    } else {
      return "not";
    }
  }
}

module.exports = Notifications;
