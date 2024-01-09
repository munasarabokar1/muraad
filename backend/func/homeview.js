const db = require("../config/data");
const Find = require("../data/Find");
const Insert = require("../data/create");

// Latest transection
function latestTrans(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().LatestTransction();
    db.query(select, [user_id], (err, data) => {
      resolve(data);
    });
  });
}

// analysis sum amounts days
function totalDays(user_id) {
  return new Promise((resove, reject) => {
    // day analys
    var total_days = new Find().TotalSalesAmount();
    db.query(total_days, [user_id], (err, data) => {
      if (data.length > 0) {
        if (data[0].day == null) {
          resove("0.00");
        } else {
          resove(data[0].day);
        }
      }
    });
  });
}

// analysis total of transections day success
function totalSalesCount(user_id) {
  return new Promise((resove, reject) => {
    // day analys
    var seles = new Find().TotalSalesCount();
    db.query(seles, [user_id], (err, data) => {
      if (data.length > 0) {
        resove(data[0].day);
      }
    });
  });
}
// analysis total of transections day canceled
function unSuccessfullyTodayCuunt(user_id) {
  return new Promise((resove, reject) => {
    // day analys
    var un = new Find().TotalUnsuccessCount();
    db.query(un, [user_id], (err, data) => {
      if (data.length > 0) {
        resove(data[0].day);
      }
    });
  });
}

// analysis number of transection  pending all time
function totalPendingCount(user_id) {
  return new Promise((resove, reject) => {
    // total all time
    var pend = new Find().TotalPendingCount();
    db.query(pend, [user_id], (err, data) => {
      if (data.length > 0) {
        resove(data[0].day);
      }
    });
  });
}

// counts Mgss
function msgCounts(user_id, xaalada) {
  return new Promise((resove, reject) => {
    // day analys
    var msg = new Find().MsgCounts();
    db.query(msg, [user_id, xaalada], (err, data) => {
      if (err) resove(err);
      data.length > 0 ? resove(data[0].c) : { msg: 0 };
    });
  });
}

function ListTodayTrans(user_id, type) {
  return new Promise((resolve, reject) => {
    const val = type == "costumers" ? "success" : "canceled";
    const select = new Find().ListTransToday();
    db.query(select, [user_id, val], (err, data) => {
      if (err) resolve(err);
      resolve(data);
    });
  });
}

function last7Days(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().Last7Days();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      resolve(data);
    });
  });
}

function ListPendTrans(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().TotalPending();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}

module.exports = {
  latestTrans,
  totalSalesCount,
  totalPendingCount,
  unSuccessfullyTodayCuunt,
  msgCounts,
  totalDays,
  ListTodayTrans,
  ListPendTrans,
  last7Days,
};
