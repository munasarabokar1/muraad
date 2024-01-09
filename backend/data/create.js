class Insert {
  constructor(name) {
    this.name = name;
  }
  // create new user
  InsertUser() {
    return "INSERT INTO user_login (user_name, user_password, pin, full_name, p_number,deegaan, role, annknown, balance , xaalada, created_at, expiretime) VALUES (?)";
  }
  // insert transection
  SendTrans() {
    return "INSERT INTO getnote (user_id, types, numbers, amounts, xaalada, send_time) VALUES (?)";
  }
  // insert comment
  InsetComent() {
    return "INSERT INTO comment (n_id, comment) VALUES (?)";
  }

  Dalab() {
    return "INSERT INTO natiijo (user_id, cos_id, magaca , h_number , s_number , types , amount , profit , xaalada , created_at) VALUES (?)";
  }
  Msg() {
    return "INSERT INTO msgs (user_id, sender , body , xaalada ,cos_id, created_at) VALUES (?)";
  }
  LastSeen() {
    return "INSERT INTO last_seen (user_id , loggined) VALUES (?, ?)";
  }
  NewCostumer() {
    return "INSERT INTO macaamiil ( user_id, name, h_number, s_number, types) VALUES (?)";
  }
  InsDiidmo() {
    return "INSERT INTO diidmo (types, amount, user_id) VALUES (?)";
  }
}

module.exports = Insert;
