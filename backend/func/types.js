const db = require("../config/data");
const Find = require("../data/Find");
const Insert = require("../data/create");

// Types
function FindType(type) {
  return new Promise((resolve, reject) => {
    const select = new Find().FindTypes();
    db.query(select, [type], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}

// find type amount
function isAmounts(amount) {
  return new Promise((resolve, reject) => {
    const select = new Find().isAmount();
    db.query(select, [amount], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// send transections
const sendTransectionNow = (value) => {
  return new Promise((resolve, reject) => {
    const insert = new Insert().SendTrans();
    db.query(insert, [value], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
};

module.exports = {
  FindType,
  isAmounts,
};
