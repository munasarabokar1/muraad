const { lastSeen } = require("../../func/users");

class LastSeen {
  constructor(user) {
    this.user = user;
  }

  async LastSeen() {
    return await lastSeen(this.user.user_id);
  }
}

module.exports = LastSeen;
