const { excuteSql } = require('../utils/sql');
class userService {
  async u_select(ctx, next) {
    try {
      const result = await excuteSql(`SELECT * FROM t_admin`);
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
  async u_insert(ctx, next) {
    try {
      let _sql = 'INSERT INTO t_admin( uname, pwd) VALUES ( ?, ?)';
      let _values = [ctx.request.body.uname, ctx.request.body.pwd];
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
  async u_update(ctx, next) {
    try {
      let _sql = 'UPDATE t_admin SET uname=?, pwd=? WHERE id=?';
      let _values = [
        ctx.request.body.uname,
        ctx.request.body.pwd,
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
  async u_del(ctx, next) {
    try {
      let _sql = 'DELETE FROM t_admin WHERE id=?';
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

module.exports = new userService();
