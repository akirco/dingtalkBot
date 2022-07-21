const { excuteSql } = require("../utils/sql");
const jsonFormate = require("../utils/jsonFormate");
class botService {
  async botSelectByUid(ctx, next) {
    try {
      let _sql = `select botId,baseUrl,accessToken,secret from bot where uid = ?`;
      let _values = [ctx.request.query.uid];
      const result = await excuteSql(_sql, _values);
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

  async botInsert(ctx, next) {
    try {
      let _sql = "INSERT INTO bot(uid, accessToken, secret) VALUES (?,?,?)";
      let _values = [
        ctx.request.body.uid,
        ctx.request.body.accessToken,
        ctx.request.body.secret,
      ];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: "insert success",
        data: result,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "insert error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
  async botUpdateByBotId(ctx, next) {
    try {
      let _sql = "update bot set accessToken=?,secret=? where botId=?";
      let _values = [
        ctx.request.body.accessToken,
        ctx.request.body.secret,
        ctx.request.body.botId,
      ];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: "update success",
        data: result,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "update error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
  async botDeleteByBotId(ctx, next) {
    try {
      let _sql = "delete from bot where botId=?";
      let _values = [ctx.params.botId];
      let result = await excuteSql(_sql, _values);
      result = jsonFormate(result).affectedRows;
      ctx.body = {
        msg: "delete success",
        data: `影响行数为:${result}条`,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "delete error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
}
module.exports = new botService();
