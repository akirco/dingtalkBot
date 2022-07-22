const { excuteSql } = require("../utils/sql");

class Admin {
  async selectAll(ctx, next) {
    try {
      const _sql = `select * from bot,jobs,user where bot.botId=jobs.botId and user.uid=bot.uid;`;
      const result = await excuteSql(_sql);
      ctx.body = {
        msg: "select success",
        data: result,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "select error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
}

module.exports = new Admin();
