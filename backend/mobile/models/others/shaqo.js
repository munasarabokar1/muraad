const db = require("../../../config/data");
const Delete = require("../data/Delete");
const Finding = require("../data/Finding");
const Insert = require("../data/Insert");
const Update = require("../data/Update");
const Fake = require("./fake");
////////////////////// select
// find device
function FindUser(device) {
  return new Promise((resolve, reject) => {
    const select = new Finding().FindUser();
    const fake = new Fake();
    db.query(select, device, (err, data) => {
      if (err) {
        resolve(err);
      }
      const results = data?.length > 0 ? data : fake.FakeUser();
      resolve(results);
    });
  });
}
// check ammount if exists
function amountsCheck(amount) {
  return new Promise((resolve, reject) => {
    const amoutss = new Finding();
    db.query(amoutss.DefaultAmount(), amount, (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
//last seen

const findLastSeen = (user_id) => {
  return new Promise((resolve, reject) => {
    const selects = new Finding();
    db.query(selects.FindLastSeen(), [user_id], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data : "last";
      resolve(results);
    });
  });
};

// notifications
// get msgs
function getMsgs(user_id, type) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    const fake = new Fake(user_id);
    db.query(select.LatestSMS(), [user_id, type], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data : fake.Msgs();
      resolve(results);
    });
  });
}

const findNotification = (user_id) => {
  return new Promise((resolve, reject) => {
    const selects = new Finding();
    db.query(selects.FindNotification(), [user_id], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
};

// choose ammount from doorasho table
function selecAmouts(name, amount) {
  return new Promise((resolve, reject) => {
    const select = new Finding(name);
    db.query(select.FindAmounts(), amount, (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
/// check if not active
function IsBanned(amount, user_id, types) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    db.query(select.FindBanned(), [amount, user_id, types], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}

// find costumer info by hormuud
function findCostumers(numbers, user_id) {
  return new Promise(async (resolve, reject) => {
    const select = new Finding();
    const number = numbers;
    db.query(
      select.FindCostumers(),
      [user_id, number, numbers],
      (err, data) => {
        if (err) resolve(err);
        const results = data?.length > 0 ? data[0] : "not";
        resolve(results);
      }
    );
  });
}
// check the type information of costumer
function selectTypes(type) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    db.query(select.TypesOnly(), [type], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
// check natiijo
function checksNtijo(number, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    db.query(select.CheckSend(), [number, user_id], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
function isLastTransSucc(number, user_id) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    db.query(select.isSent(), [number, user_id], (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data[0] : "not";
      resolve(results);
    });
  });
}
/////////////////////// update
// update natiijo
function updateNtjjo(id, time) {
  return new Promise((resolve, reject) => {
    const update = new Update();
    db.query(update.UpdateNatiijo(), [time, id], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
}
// update expiire
function updateExp(user) {
  return new Promise((resolve, reject) => {
    const update = new Update();
    db.query(update.UpdateUserStatus(), user, (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
}
/// update balance
function updateBalence(user, balance) {
  return new Promise((resolve, reject) => {
    const update = new Update();
    db.query(update.UpdateBlance(), [balance, user], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
}
// update last seeb
const UpdateLastSeen = (user_id) => {
  return new Promise(async (resolve, reject) => {
    const nowDate = new Date();
    const update = new Update();
    db.query(update.UpdateLastSeen(), [nowDate, user_id], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
};
// update Notts
const updateNotts = (id) => {
  return new Promise((resolve, reject) => {
    const update = new Update();
    db.query(update.UpdateNotifications(), [id], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
};
//////////////// Insert
/// insert msg
function InserMsgs(body, user, xaalada, macaamiil) {
  return new Promise((resolve, reject) => {
    const nowDate = new Date();
    const insert = new Insert();

    db.query(
      insert.Msg(),
      [user, body.sender, body.list, xaalada, macaamiil, nowDate],
      (err, data) => {
        if (err) resolve(err);
        resolve("oke");
      }
    );
  });
}
// insert Dalab
function InserDalab(value) {
  return new Promise((resolve, reject) => {
    const insert = new Insert();
    db.query(insert.Dalab(), value, (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
}
// insert comment
const insertComment = (comment, id) => {
  return new Promise((resolve, reject) => {
    const insert = "INSERT INTO comment ( n_id, comment) VALUES (? , ?)";
    db.query(insert, [id, comment], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
};
// insert waiting
const sendTransectionNow = (value) => {
  return new Promise((resolve, reject) => {
    const insert =
      "INSERT INTO getnote (user_id, types, numbers, amounts, xaalada, send_time) VALUES (?)";
    db.query(insert, [value], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
};
// insert last seen
function InsertLast(user_id) {
  return new Promise((resolve, reject) => {
    const nowDate = new Date();
    const insert = new Insert();
    db.query(insert.LastSeen(), [user_id, nowDate], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}

/////////////////////////// Delete

const delNotification = (id) => {
  return new Promise((resolve, reject) => {
    const deletes = new Delete();
    db.query(deletes.DeleteNotification(), [id], (err, data) => {
      if (err) resolve("err");
      resolve("oke");
    });
  });
};

////////////////////// others
// find text by finding
function findUnknowTypes(file, item) {
  return new Promise(async (resolve, reject) => {
    let arr = file.split(/\r?\n/);
    arr.forEach((line, idx) => {
      if (line.includes(item)) {
        resolve(item);
      } else {
        resolve("");
      }
    });
  });
}
module.exports = {
  // select
  FindUser,
  amountsCheck,
  selecAmouts,
  findCostumers,
  getMsgs,
  selectTypes,
  checksNtijo,
  isLastTransSucc,
  findLastSeen,
  findNotification,
  IsBanned,
  // update
  updateBalence,
  updateExp,
  updateNtjjo,
  updateNotts,
  UpdateLastSeen,
  // insert
  InserDalab,
  sendTransectionNow,
  insertComment,
  InserMsgs,
  InsertLast,
  // delete
  delNotification,
  // others
  findUnknowTypes,
};
