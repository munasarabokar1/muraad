class Select {
  constructor(name) {
    this.name = name;
  }

  FindUser() {
    return "SELECT * FROM user_login WHERE  deviceid = ? AND xaalada = 'active'";
  }

  FindClient() {
    return "SELECT * FROM user_login WHERE  client = ? AND xaalada = 'active'";
  }
}

module.exports = Select;
