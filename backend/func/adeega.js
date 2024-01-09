const db = require("../config/data");
const Delete = require("../data/Delete");
const Find = require("../data/Find");
const Insert = require("../data/create");

// Only 1 Types By amount
function FindsAdeega(type, amount) {
  return new Promise((resolve, reject) => {
    const select = new Find(type).FindAdeega();
    db.query(select, [amount], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}

// Only 1 Types By ID
function FindsAdeegaId(type, id) {
  return new Promise((resolve, reject) => {
    const select = new Find(type).FindAdeegaID();
    db.query(select, [id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}

// all amount Types
function FindsAll(type) {
  return new Promise((resolve, reject) => {
    const select = new Find(type).FindAllAdeega();
    db.query(select, (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}

// is Active Or not
function FindDiidmo(user_id, type, amount) {
  return new Promise((resolve, reject) => {
    const select = new Find().isFindDiidmo();
    db.query(select, [user_id, type, amount], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// create diidmo
function insertDiidmo(value) {
  return new Promise((resolve, reject) => {
    const insert = new Insert().InsDiidmo();
    db.query(insert, [value], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}
// delete diidmo
function delDiidmo(id) {
  return new Promise((resolve, reject) => {
    const del = new Delete().DelItemDiidmo();
    db.query(del, [id], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}
module.exports = {
  FindsAdeega,
  FindsAll,
  FindDiidmo,
  FindsAdeegaId,
  delDiidmo,
  insertDiidmo,
};
