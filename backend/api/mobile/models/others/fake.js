class Fake {
  constructor(id) {
    this.id = id;
  }
  FakeUser() {
    const user = [
      {
        user_id: 0,
        user_name: "fake",
        user_password: "",
        pin: "0000",
        full_name: "Invalid Name",
        p_number: "61XXXXXXX",
        deegaan: "Somalia",
        role: "banned",
        deviceid: "00000000000000",
        balance: "0.00.",
        xaalada: "banned",
        created_at: "2023-01-23T15:35:21.000Z",
        expiretime: "2023-01-01T10:09:05.000Z",
      },
    ];
    return user;
  }
  FakeTransections() {
    const transections = [
      {
        id: 0,
        user_id: this.id,
        cos_id: 0,
        magaca: "Not Found",
        h_number: "61XXXXX",
        s_number: "62XXXXX",
        types: "Invalid",
        amount: "0.0",
        profit: "0.0",
        xaalada: "not found",
        created_at: "2023-04-16T20:23:57.000Z",
      },
    ];
    return transections;
  }
  Msgs() {
    const msgs = [
      {
        id: 0,
        user_id: this.id,
        sender: "192",
        body: "Not Found",
        xaalada: "invalid",
        created_at: "2023-01-23T15:35:21.000Z",
      },
    ];
    return msgs;
  }
}

module.exports = Fake;
