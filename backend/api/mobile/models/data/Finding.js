class Finding {
  constructor(name) {
    this.name = name;
  }
  TypesOnly() {
    return "SELECT * FROM types WHERE types = ?";
  }

  CheckSend() {
    return "SELECT * FROM natiijo WHERE s_number = ? AND user_id = ? AND xaalada = 'pending' ORDER BY id DESC";
  }
  isSent() {
    return "SELECT * FROM natiijo WHERE s_number = ? AND user_id = ? AND xaalada = 'success' ORDER BY id DESC";
  }
  FindBanned() {
    return "SELECT * FROM diidmo WHERE amount = ? AND user_id = ? AND types = ?";
  }
  DefaultAmount() {
    return "SELECT * FROM amounts WHERE lacagta = ?";
  }
  FindAmounts() {
    return `SELECT * FROM ${this.name} WHERE amount = ?`;
  }
  FindUser() {
    return "SELECT * FROM user_login WHERE  deviceid = ? AND xaalada = 'active'";
  }
  FindNotification() {
    return "SELECT * FROM getnote WHERE user_id = ? ORDER BY send_time ASC ";
  }
  FindLastSeen() {
    return "SELECT * FROM last_seen WHERE user_id = ?";
  }
  LatestTransections() {
    return "SELECT * FROM natiijo WHERE user_id = ? ORDER BY id DESC LIMIT 10";
  }
  LatestSMS() {
    return "SELECT * FROM msgs WHERE user_id = ? AND sender = ? ORDER BY id DESC LIMIT 10";
  }
  FindCostumers() {
    return "SELECT * FROM macaamiil WHERE user_id = ? AND xaalada = 'active' AND h_number = ? OR s_number = ?";
  }
}

module.exports = Finding;
