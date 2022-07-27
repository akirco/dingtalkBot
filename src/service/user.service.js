const { excuteSql } = require('../utils/sql');
const jsonFormate = require('../utils/jsonFormate');
const jwt = require('jsonwebtoken')
class userService {
  async userSelectByUid(ctx, next) {
    try {
      let _sql = `select * from user where uid = ?`;
      let _values = [ctx.request.query.uid];
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
  async userInsert(ctx, next) {
    try {
      let _sql = 'insert into user(uname, pwd) values ( ?, ?)';
      let _values = [ctx.request.body.uname, ctx.request.body.pwd];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'insert success',
        data: result.affectedRows>=1?`注册成功!`:null,
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
  async userUpdateByUid(ctx, next) {
    try {
      let _sql = 'update user set uname=?, pwd=? WHERE uid=?';
      let _values = [
        ctx.request.body.uname,
        ctx.request.body.pwd,
        ctx.request.body.uid,
      ];
      const result = await excuteSql(_sql, _values);
      ctx.body = {
        msg: 'update success',
        data: result,
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
  async userDeleteByUid(ctx, next) {
    try {
      let _sql = 'delete from user where uid=?';
      let _values = [ctx.params.id];
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
  async userSignIn(ctx,next){
    try {
      const _values = ctx.request.body;
      if(!_values.uname||!_values.pwd){
         ctx.body={
          msg:"用户名或密码为空！",
          data:null,
          code:404
        }
      }
      let _sql=`select uid,pwd,isAdmin from user where uname = ?`
      let result = await excuteSql(_sql,[ctx.request.body.uname]);
      result = jsonFormate(result)[0];
      if(result.pwd===ctx.request.body.pwd){
        const token = jwt.sign({name:ctx.request.body.uname},"RHhJsX22NXiwfYJ",{expiresIn: 60 * 60*60})
        ctx.body={
          msg:"登录成功！",
          data:{
            token,
            data:{
              uid:result.uid,
              uname:ctx.request.body.uname,
              pwd:"",
              isAdmin:result.isAdmin
            }
          },
          code:200
        }
      }else{
        ctx.body={
          msg:"用户名或密码错误！",
          data:null,
          code:200
        }
      }
    } catch (error) {
      ctx.body = {
        msg: 'sign in error',
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  }
}

module.exports = new userService();
