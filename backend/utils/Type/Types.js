const { FindType } = require("../../func/types");
const Adeega = require("../Adeega/Adeega");

class Types {
  constructor(type, amount) {
    this.type = type;
    this.amount = amount;
  }
  async Types() {
    const t = await this.Find();
    if (t != "") {
      return {
        adeega: await new Adeega(t.nooca, this.amount).Nooca(),
        type: t,
      };
    }
  }
  async All() {
    const t = await this.Find();
    if (t != "") {
      return await new Adeega(t.nooca).All();
    }
  }

  async Find() {
    return await FindType(this.type);
  }
}

module.exports = Types;
