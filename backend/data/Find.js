class Find {
  constructor(name) {
    this.name = name;
  }

  /// table user_login
  // username
  FindUsername() {
    return "SELECT * FROM user_login WHERE user_name = ?";
  }
  // user id
  FindUserId() {
    return "SELECT * FROM user_login WHERE user_id = ?";
  }
  ListUsers() {
    return "SELECT * FROM user_login WHERE isAdmin = 'yes' ORDER BY user_id DESC";
  }
  // last seen device
  LastSeen() {
    return "SELECT * FROM last_seen WHERE user_id = ?";
  }

  // table natiijo
  // last top 10 trans in home view
  LatestTransction() {
    return "SELECT * FROM natiijo WHERE user_id =  ? ORDER BY id DESC LIMIT 15";
  }
  // list Trans
  ListTrans() {
    return "SELECT * FROM natiijo WHERE user_id = ? ORDER BY id DESC";
  }
  // check send
  CheckSend() {
    return "SELECT * FROM natiijo WHERE s_number = ? AND user_id = ? AND xaalada = 'pending' ORDER BY id DESC";
  }
  // details trans
  ViewTrans() {
    return "SELECT * FROM natiijo WHERE id = ? AND user_id =  ?";
  }
  FindCostumers() {
    return "SELECT * FROM macaamiil WHERE user_id = ? AND xaalada = 'active' AND h_number = ? OR s_number = ?";
  }
  // total seles amount per day
  TotalSalesAmount() {
    return "SELECT SUM(amount) as day FROM natiijo WHERE created_at > CURDATE() AND user_id = ? AND xaalada = 'success'";
  }
  // total costumers per day
  TotalSalesCount() {
    return "SELECT COUNT(id) as day FROM natiijo WHERE created_at > CURDATE() AND user_id = ? AND xaalada = 'success'";
  }
  // totan unsuccessfully per day
  TotalUnsuccessCount() {
    return "SELECT COUNT(amount) as day FROM natiijo WHERE created_at > CURDATE() AND user_id = ? AND xaalada = 'canceled'";
  }
  // pending count
  TotalPendingCount() {
    return "SELECT COUNT(amount) as day FROM natiijo WHERE user_id = ? AND xaalada = 'pending'";
  }
  // pending only
  TotalPending() {
    return "SELECT * FROM natiijo WHERE user_id = ? AND xaalada = 'pending'";
  }
  // total seles amount per day
  ListTransToday() {
    return "SELECT * FROM natiijo WHERE created_at > CURDATE() AND user_id = ? AND xaalada = ?";
  }
  // chart analysis
  Last7Days() {
    return "SELECT DATE_FORMAT(created_at, '%M-%d') as DATE, SUM(amount) amount , SUM(profit) profit FROM natiijo WHERE user_id = ? GROUP BY DATE(created_at) ORDER BY id DESC LIMIT 10";
  }
  // table macaamiil
  // list all costumers
  ListCostumers() {
    return "SELECT * FROM macaamiil WHERE user_id = ? ORDER BY cid DESC";
  }
  // details cotumers
  ViewCosts() {
    return "SELECT * FROM macaamiil WHERE cid = ? AND user_id =  ?";
  }
  // find hormuud number or somtel
  ViewCostsByNumber() {
    return "SELECT * FROM macaamiil WHERE user_id = ? AND h_number =  ? OR s_number = ?";
  }
  // find hormuud number onlu
  ViewCostsHor() {
    return "SELECT * FROM macaamiil WHERE user_id = ? AND h_number =  ?";
  }

  // table msg
  // list all msg
  ListMsg() {
    return "SELECT * FROM msgs WHERE user_id = ? AND sender = ?  AND xaalada = ? ORDER BY id DESC";
  }
  // view details msg
  ViewMsg() {
    return "SELECT * FROM msgs WHERE user_id = ?  AND id = ?";
  }
  // count msgs other or mobile if user enabled
  MsgCounts() {
    return "SELECT COUNT(id) as c FROM msgs WHERE user_id = ? AND xaalada = ?";
  }

  // table Types
  // find  Types with nooca
  FindTypes() {
    return "SELECT * FROM types WHERE types = ?";
  }
  isAmount() {
    return "SELECT * FROM amounts WHERE lacagta = ?";
  }

  //table abaal or dhammeys or voice
  // find adeega u dalban iyo qiimaha short gooda
  FindAdeega() {
    return `SELECT * FROM ${this.name} WHERE amount = ?`;
  }
  // find adeega by id
  FindAdeegaID() {
    return `SELECT * FROM ${this.name} WHERE id = ?`;
  }
  // find all
  FindAllAdeega() {
    return `SELECT * FROM ${this.name}`;
  }

  //table diidmo
  //find types amount id
  isFindDiidmo() {
    return "SELECT * FROM diidmo WHERE user_id = ? AND types = ? AND amount = ?";
  }
  // table getnode
  // list all
  GetNoteAll() {
    return "SELECT * FROM getnote WHERE user_id = ? ORDER BY id DESC";
  }
  // find getnode by number and amount
  FindGetNote() {
    return "SELECT * FROM getnote WHERE numbers = ? AND amounts = ?";
  }
  // find getnode by id only
  FindGetNoteID() {
    return "SELECT * FROM getnote WHERE id = ? AND user_id = ?";
  }
  //
}

module.exports = Find;
