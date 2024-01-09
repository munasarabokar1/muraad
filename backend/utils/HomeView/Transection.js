const { latestTrans } = require("../../func/homeview");

class HomeLatestTrans {
  constructor(user) {
    this.user = user;
  }

  async Latest() {
    return await latestTrans(this.user.user_id);
  }
}

module.exports = HomeLatestTrans;
