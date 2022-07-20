const { excuteSql } = require('../utils/sql');
class jobService {
  async jobSelectByBotId(ctx, next) {
    try {
      const result = await excuteSql(`SELECT * FROM t_data`);
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
  async jobInsertByBotId(ctx, next) {
    try {
      let _sql = 'INSERT INTO t_data( img1,img2,img3,txt) VALUES ( ?, ?,?, ?)';
      let _values = [
        ctx.request.body.img1,
        ctx.request.body.img2,
        ctx.request.body.img3,
        ctx.request.body.txt,
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
      let _sql = 'UPDATE t_data SET img1=?, img2=?, img3=?, txt=? WHERE id=?';
      let _values = [
        ctx.request.body.img1,
        ctx.request.body.img2,
        ctx.request.body.img3,
        ctx.request.body.txt,
        ctx.request.body.id,
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
      let _sql = 'DELETE FROM t_data WHERE id=?';
      let _values = [ctx.request.body.id];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'del success',
        data: result.id,
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
