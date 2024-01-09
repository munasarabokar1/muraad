class Delete {
  constructor(name) {
    this.name = name;
  }
  DeleteNotification() {
    return "DELETE FROM getnote WHERE id = ?";
  }
  DelInbox() {
    return "DELETE FROM msgs WHERE id =  ? AND user_id = ?";
  }
  DelItemDiidmo() {
    return "DELETE FROM diidmo WHERE id = ?";
  }
  DelGetNode() {
    return "DELETE FROM getnote WHERE id = ? AND user_id = ?";
  }
}

module.exports = Delete;
