const { excuteSql } = require('../utils/sql');

class senderService {
  async s_select(ctx, next) {
    try {
      const result = await excuteSql(`SELECT * FROM t_sender`);
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
  async s_insert(ctx, next) {
    try {
      let _sql = 'INSERT INTO t_sender( secret, webhook) VALUES ( ?, ?)';
      let _values = [ctx.request.body.secret, ctx.request.body.webhook];
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
  async s_update(ctx, next) {
    try {
      let _sql = 'UPDATE t_sender SET secret=?, webhook=? WHERE id=?';
      let _values = [
        ctx.request.body.secret,
        ctx.request.body.webhook,
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
  async s_del(ctx, next) {
    try {
      let _sql = 'DELETE FROM t_sender WHERE id=?';
      let _values = [ctx.params.id];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'delete success',
        data: result.id,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: 'delete error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
}
module.exports = new senderService();
