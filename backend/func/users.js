const moment = require("moment");
const db = require("../config/data");
const Find = require("../data/Find");
const Insert = require("../data/create");
const Update = require("../data/Update");

// find user function
const FindUser = (username) => {
  return new Promise((resolve, reject) => {
    const s = new Find().FindUsername();
    db.query(s, username, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve(null);
    });
  });
};
//find by id
const FindId = (username) => {
  return new Promise((resolve, reject) => {
    const s = new Find().FindUserId();
    db.query(s, username, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve(null);
    });
  });
};
// List All users
function listUser() {
  return new Promise((resolve, reject) => {
    const select = new Find().ListUsers();
    db.query(select, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}
// insert user function
const CreateUsers = (value) => {
  return new Promise((resolve, reject) => {
    const i = new Insert().InsertUser();
    db.query(i, [value], (err, data) => {
      if (err) {
        resolve(err.sqlMessage);
      } else {
        resolve(data.affectedRows);
      }
    });
  });
};

// device check for last seen
function lastSeen(user_id) {
  return new Promise(async (resolve, reject) => {
    const select = new Find().LastSeen();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      const result =
        data?.length > 0
          ? moment(data[0].loggined).fromNow()
          : "Not Registered";
      resolve(result);
    });
  });
}
// update info
function updateUsers(type, id, body) {
  return new Promise((resolve, reject) => {
    const update = new Update(type).UpdUser();
    db.query(update, [body, id], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}
module.exports = {
  FindUser,
  CreateUsers,
  FindId,
  lastSeen,
  updateUsers,
  listUser,
};
