const db = require("../../../config/data");
const check = require("../functions/check.js");
const Fake = require("../others/fake");
const Finding = require("../data/Finding");

module.exports = class getTransing {
  constructor(device) {
    this.device = device;
  }
  async Latest() {
    const checks = new check(this.device);
    const resluts = await checks.Checking();
    const fake = new Fake(resluts[0].user_id);
    const rr =
      resluts[0].user_name == "fake"
        ? fake.FakeTransections()
        : FindNow(resluts[0].user_id);
    return rr;
  }
};

function FindNow(user_id) {
  return new Promise((resolve, reject) => {
    const select = new Finding();
    const fake = new Fake(user_id);
    db.query(select.LatestTransections(), user_id, (err, data) => {
      if (err) resolve(err);
      const results = data?.length > 0 ? data : fake.FakeTransections();
      resolve(results);
    });
  });
}
