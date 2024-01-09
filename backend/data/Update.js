class Update {
  constructor(name) {
    this.name = name;
  }
  // update resseler pin , password , device id
  UpdUser() {
    return `UPDATE user_login SET ${this.name} = ? WHERE user_id = ?`;
  }
  // update transection
  UpdateTrans() {
    return "UPDATE natiijo SET xaalada = ? WHERE id = ?";
  }
  //update costumers
  UpdateCosts() {
    return "UPDATE macaamiil SET name = ? , h_number = ?, s_number = ?, types = ? WHERE cid = ?";
  }
  //update status costumers
  UpdateStatusCostumer() {
    return "UPDATE macaamiil SET xaalada = ? WHERE cid = ?";
  }
  // update balance
  UpdateBlance() {
    return "UPDATE user_login SET balance = ? WHERE  user_id = ?";
  }
  UpdateNatiijo() {
    return "UPDATE natiijo SET xaalada ='success' , created_at = ? WHERE  id= ?";
  }
  UpdateSend() {
    return "UPDATE getnote SET xaalada = 'success' WHERE  id= ?";
  }
  UpdateLastSeen() {
    return "UPDATE last_seen SET loggined = ? WHERE user_id = ?";
  }
  UpdateNotifications() {
    return "UPDATE getnote SET xaalada = 'pending' WHERE id = ?";
  }
  UpdateUserStatus() {
    return "UPDATE user_login SET xaalada = 'banned' WHERE user_id = ?";
  }
}

module.exports = Update;
