class Update {
  constructor(name) {
    this.name = name;
  }
  UpdateBlance() {
    return "UPDATE user_login SET balance = ? WHERE  user_id= ?";
  }
  UpdateClient() {
    return "UPDATE user_login SET client = ? WHERE deviceid = ?";
  }
  UpdateStatus() {
    return "UPDATE user_login SET status = ? WHERE client = ?";
  }
  UpdateLastSeen() {
    return "UPDATE user_login SET lastLogin = ? WHERE client = ?";
  }
  UpdateNatiijo() {
    return "UPDATE natiijo SET xaalada ='success' , created_at = ? WHERE  id= ?";
  }
  UpdateSend() {
    return "UPDATE getnote SET xaalada = 'success' WHERE  id= ?";
  }
  UpdateNotifications() {
    return "UPDATE getnote SET xaalada = 'pending' WHERE id = ?";
  }
  UpdateUserStatus() {
    return "UPDATE user_login SET xaalada = 'banned' WHERE user_id = ?";
  }
}

module.exports = Update;
