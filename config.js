class config {
  constructor() {
    this.mysql = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'dingTalkBot',
    };
    this.app = {
      port: 4000,
    };
  }
}

module.exports = new config();
