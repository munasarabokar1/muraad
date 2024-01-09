const db = require("../config/data");
const Delete = require("../data/Delete");
const Find = require("../data/Find");
const Update = require("../data/Update");
const Insert = require("../data/create");

// List All inbox
function ListInB(user_id, sender, status) {
  return new Promise((resolve, reject) => {
    const select = new Find().ListMsg();
    db.query(select, [user_id, sender, status], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}
// View Details inbox
function inBoxDetails(id, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ViewMsg();
    db.query(select, [user_id, id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}

// delete inbox

function delInB(id, user_id) {
  return new Promise((resolve, reject) => {
    const del = new Delete().DelInbox();
    db.query(del, [id, user_id], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}

/// insert msg
function InserMsgs(body, user, xaalada, macaamiil) {
  return new Promise((resolve, reject) => {
    const nowDate = new Date();
    const insert = new Insert();
    const v = [user, body.sender, body.list, xaalada, macaamiil, nowDate];
    db.query(insert.Msg(), [v], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}

module.exports = {
  ListInB,
  inBoxDetails,
  delInB,
  InserMsgs,
};
