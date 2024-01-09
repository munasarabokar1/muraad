const db = require("../config/data");
const Delete = require("../data/Delete");
const Find = require("../data/Find");

// List all Get node
function listgetNode(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().GetNoteAll();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}

// Check Get node by number and amount
function FindgetNode(number, amount) {
  return new Promise((resolve, reject) => {
    const select = new Find().FindGetNote();
    db.query(select, [number, amount], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// Check Get node by ID
function FindgetNodeId(id, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().FindGetNoteID();
    db.query(select, [id, user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}

// delete getnode
function delGetNode(id, user_id) {
  return new Promise((resolve, reject) => {
    const del = new Delete().DelGetNode();
    db.query(del, [id, user_id], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}

module.exports = {
  FindgetNode,
  delGetNode,
  listgetNode,
  FindgetNodeId,
};
