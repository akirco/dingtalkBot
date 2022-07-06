class config {
  constructor() {
    this.mysql = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "123456",
      database: "dingTalkBot",
    };
  }
}

module.exports = new config();
