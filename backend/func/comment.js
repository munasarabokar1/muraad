const db = require("../config/data");
const Find = require("../data/Find");
const Insert = require("../data/create");

// insert comment
function insertComment(value) {
  return new Promise((resolve, reject) => {
    const insert = new Insert().InsetComent();
    db.query(insert, [value], (err, data) => {
      if (err) resolve(err);
      resolve("oke");
    });
  });
}

module.exports = {
  insertComment,
};
