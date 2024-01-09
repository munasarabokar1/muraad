class Delete {
  constructor(name) {
    this.name = name;
  }
  DeleteNotification() {
    return "DELETE FROM getnote WHERE id = ?";
  }
}

module.exports = Delete;
