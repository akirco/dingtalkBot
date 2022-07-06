const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const app = new Koa();
const router = new Router();
const port = 4000;
const excuteSql = require("./utils/sql");

// 跨域设置
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router
  .get("/", async (ctx) => {
    ctx.body = "Hello World";
  })
  //select
  .get("/api/v1/query", async (ctx) => {
    try {
      const result = await excuteSql("SELECT * FROM t_sender");
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
  })
  //insert
  .post("/api/v1/insert", async (ctx) => {
    try {
      let _sql = "INSERT INTO t_sender(id, secret, webhook) VALUES (?, ?, ?)";
      let _values = [
        ctx.request.body.id,
        ctx.request.body.secret,
        ctx.request.body.webhook,
      ];
      await excuteSql(_sql, _values);
      ctx.body = {
        msg: "insert success",
        data: null,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "insert error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  })
  .put("/api/v1/update", async (ctx) => {
    try {
      let _sql = "UPDATE t_sender SET secret=?, webhook=? WHERE id=?";
      let _values = [
        ctx.request.body.secret,
        ctx.request.body.webhook,
        ctx.request.body.id,
      ];
      await excuteSql(_sql, _values);
      ctx.body = {
        msg: "update success",
        data: null,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "update error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  })
  .delete("/api/v1/delete/:id", async (ctx) => {
    try {
      let _sql = "DELETE FROM t_sender WHERE id=?";
      let _values = [ctx.params.id];
      await excuteSql(_sql, _values);
      ctx.body = {
        msg: "delete success",
        data: null,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: "delete error",
        data: error.sqlMessage || null,
        code: 500,
      };
    }
  });

//listen port
app.listen(port);
console.log(`Server listening on port ${port}`);
