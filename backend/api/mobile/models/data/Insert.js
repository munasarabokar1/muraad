class Insert {
  constructor(name) {
    this.name = name;
  }
  Dalab() {
    return "INSERT INTO natiijo (user_id, cos_id, magaca , h_number , s_number , types , amount , profit , xaalada , created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  }
  Msg() {
    return "INSERT INTO msgs (user_id, sender , body , xaalada ,cos_id, created_at) VALUES (?)";
  }
  LastSeen() {
    return "INSERT INTO last_seen (user_id , loggined) VALUES (?, ?)";
  }
}
module.exports = Insert;
