const db = require("../../config/data");
const Select = require("../data/Select");
const Update = require("../data/Update");

// find device id
const findUser = (user) => {
  return new Promise((resolve, reject) => {
    const select = new Select().FindUser();
    db.query(select, user, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("not");
    });
  });
};
// find client id
const findClient = (client) => {
  return new Promise((resolve, reject) => {
    const select = new Select().FindClient();
    db.query(select, client, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("not");
    });
  });
};
// update new client id
const updateUserClient = (client, user) => {
  return new Promise((resolve, reject) => {
    const update = new Update().UpdateClient();
    db.query(update, [client, user], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
};

// update online / offline status
const updateStatus = (status, client) => {
  return new Promise((resolve, reject) => {
    const update = new Update().UpdateStatus();
    db.query(update, [status, client], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
};
// update lastSeen time
const updateLastSeen = (client) => {
  return new Promise((resolve, reject) => {
    const t = new Date();
    const update = new Update().UpdateLastSeen();
    db.query(update, [t, client], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
};

module.exports = {
  findUser,
  findClient,
  updateUserClient,
  updateLastSeen,
  updateStatus,
};
