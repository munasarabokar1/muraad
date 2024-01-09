const db = require("../config/data");
const Find = require("../data/Find");
const Update = require("../data/Update");
const Insert = require("../data/create");

// List All Costs
function ListCosts(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ListCostumers();
    db.query(select, [user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data) : resolve("");
    });
  });
}
// View Details costumers
function CostDetails(id, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ViewCosts();
    db.query(select, [id, user_id], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// find Somtel or  hormuud number costumers
function FindHorOrSom(id, hor) {
  return new Promise((resolve, reject) => {
    const select = new Find().ViewCostsByNumber();
    db.query(select, [id, hor, hor], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve(data);
    });
  });
}

// find Somtel or  hormuud number costumers
function FindHorOr(hor, id) {
  return new Promise((resolve, reject) => {
    const select = new Find().ViewCostsHor();
    db.query(select, [id, hor], (err, data) => {
      if (err) resolve(err);
      data?.length > 0 ? resolve(data[0]) : resolve("");
    });
  });
}
// add new costumer
function addCotsumer(value) {
  return new Promise((resolve, reject) => {
    const insert = new Insert().NewCostumer();
    db.query(insert, value, (err, data) => {
      if (err) resolve(err);
      resolve("New costumer has been added ..");
    });
  });
}

// update costumers
function updateCotsumer(name, hor, som, type, id) {
  return new Promise((resolve, reject) => {
    const update = new Update().UpdateCosts();
    db.query(update, [name, hor, som, type, id], (err, data) => {
      if (err) resolve(err);
      resolve("Costumer has been updated ...");
    });
  });
}

// update status costumers

function updateStatus(status, id) {
  return new Promise((resolve, reject) => {
    const update = new Update().UpdateStatusCostumer();
    db.query(update, [status, id], (err, data) => {
      if (err) resolve(err);
      resolve("Costumer has been " + status + "...");
    });
  });
}

module.exports = {
  updateStatus,
  updateCotsumer,
  ListCosts,
  CostDetails,
  addCotsumer,
  FindHorOrSom,
  FindHorOr,
};
