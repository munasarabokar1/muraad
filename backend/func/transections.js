const db = require("../config/data");
const Find = require("../data/Find");
const Update = require("../data/Update");
const Insert = require("../data/create");

// view Details transection
function TransDetails(id, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ViewTrans();
    db.query(select, [id, user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// check natiijo
function checksNtijo(number, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find();
    db.query(select.CheckSend(), [number, user_id], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
// List All Trans
function ListTrans(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ListTrans();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}
// update transection
function updateTrans(xaalada, id) {
  const result =
    xaalada == "success" ? "Has ben Sent Already" : "Has been cancled";
  return new Promise((resolve, reject) => {
    const update = new Update().UpdateTrans();
    db.query(update, [xaalada, id], (err, data) => {
      if (err) resolve(err);
      resolve(result);
    });
  });
}
//send transection
const sendTransectionNow = (value) => {
  return new Promise((resolve, reject) => {
    const insert = new Insert().SendTrans();
    db.query(insert, [value], (err, data) => {
      if (err) resolve("err");
      resolve("Has been sent ...");
    });
  });
};
// insert Dalab
function InserDalab(value) {
  return new Promise((resolve, reject) => {
    const insert = new Insert().Dalab();
    db.query(insert, [value], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
}
module.exports = {
  TransDetails,
  updateTrans,
  sendTransectionNow,
  ListTrans,
  InserDalab,
  checksNtijo,
};
