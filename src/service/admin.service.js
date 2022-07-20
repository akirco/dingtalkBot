const { excuteSql } = require('../utils/sql');

class Admin {
  async botSelectAll(ctx, next) {
    try {
      const result = await excuteSql(`SELECT * FROM t_sender`);
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
