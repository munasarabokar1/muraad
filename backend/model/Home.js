const {
  totalSalesCount,
  unSuccessfullyTodayCuunt,
  totalPendingCount,
  msgCounts,
  totalDays,
  ListTodayTrans,
  ListPendTrans,
  last7Days,
} = require("../func/homeview");
const { ListInB } = require("../func/inbox");
const LastSeen = require("../utils/HomeView/LastSeen");
const HomeLatestTrans = require("../utils/HomeView/Transection");

class HomeView {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async HomeView() {
    this.res.status(200).json({
      // user info
      users: this.req.user,
      //check if app online or offline
      lastSeen: await new LastSeen(this.req.user).LastSeen(),
      //last 10 transections
      trans: await new HomeLatestTrans(this.req.user).Latest(),
      // total anaysis by counts
      seles: await totalDays(this.req.user.user_id),
      costumers: await totalSalesCount(this.req.user.user_id),
      unsuccess: await unSuccessfullyTodayCuunt(this.req.user.user_id),
      pending: await totalPendingCount(this.req.user.user_id),
      mobile: await msgCounts(this.req.user.user_id, "mobile"),
      other: await msgCounts(this.req.user.user_id, "other"),
    });
  }

  async AnalysisView() {
    const url = this.req.params.type;
    if (url == "mobile" || url == "other") {
      this.res
        .status(200)
        .json(await ListInB(this.req.user.user_id, "192", url));
    } else if (url == "unsuccess" || url == "costumers") {
      this.res
        .status(200)
        .json(await ListTodayTrans(this.req.user.user_id, url));
    } else if (url == "pending") {
      this.res.status(200).json(await ListPendTrans(this.req.user.user_id));
    } else {
      this.res.status(404).json("not found");
    }
  }
  async Seles() {
    this.res.status(200).json({
      // this analysis seles with charts
      charts7Days: await last7Days(this.req.user.user_id),
      seles: await totalDays(this.req.user.user_id),
    });
  }
}

module.exports = HomeView;
