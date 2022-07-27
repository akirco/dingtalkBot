const { excuteSql } = require('../utils/sql');
const jsonFormate = require("../utils/jsonFormate");
class jobService {
  async jobSelectByBotId(ctx, next) {
    try {
      let _sql =  `select * from jobs where botId = ?`;
      let _values = [ctx.request.query.botId]
      const result = await excuteSql(_sql,_values);
      ctx.body = {
        msg: 'select success',
        data: result,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: 'select error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
  async jobInsert(ctx, next) {
    try {
      let _sql = 'insert into jobs(botId, img1, img2, img3, txt1, txt2) values (?,?,?,?,?,?)';
      let _values = [
        ctx.request.body.img1,
        ctx.request.body.img2,
        ctx.request.body.img3,
        ctx.request.body.txt1,
        ctx.request.body.txt2,
      ];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'insert success',
        data: result.id,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: 'insert error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
  async jobUpdateByBotId(ctx, next) {
    try {
      let _sql = 'update jobs set img1=?, img2=?,img3=?,txt1=?,txt2=? WHERE botId=?';
      let _values = [
        ctx.request.body.img1,
        ctx.request.body.img2,
        ctx.request.body.img3,
        ctx.request.body.txt1,
        ctx.request.body.txt2,
        ctx.request.body.botId
      ];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'update success',
        data: result.id,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: 'update error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
  async jobDeleteByBotId(ctx, next) {
    try {
      let _sql = 'delete from jobs where botId=?';
      let _values = [ctx.params.botId];
      let result = await excuteSql(_sql, _values);
      result = jsonFormate(result);
      ctx.body = {
        msg: 'del success',
        data: `影响行数为:${result}条`,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: 'del error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
}
module.exports = new jobService();
