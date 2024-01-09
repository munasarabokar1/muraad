function filterText(body) {
  return new Promise((resolve, reject) => {
    const number = body.replace(/[^0-9\.]+/g, ",");
    var checking = [];
    const words = number.split(",");
    words.forEach(counts);
    function counts(c) {
      checking.push({ c });
    }

    resolve(checking);
  });
}

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

module.exports = { filterText, findUnknowTypes };
