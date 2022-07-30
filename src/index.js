const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const serve = require("koa-staticfiles");
const koajwt = require("koa-jwt");
const schedule = require("node-schedule");
const shell = require("shelljs");
const { APP_PORT } = require("./config/default");
const botRouter = require("./router/bot.router");
const userRouter = require("./router/user.router");
const jobsRouter = require("./router/jobs.router");
const uploadRouter = require("./router/upload.router");
const { selectAll } = require("./service/admin.service");
const app = new Koa();
const router = new Router();

//! 跨域设置
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve("./public/upload", { prefix: "/static" }));

//! 错误处理
app.use(async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = `Protected resource,use Authorization header to get access\n`;
    } else {
      throw err;
    }
  }
});
//! jwt校验
app.use(
  koajwt({ secret: "RHhJsX22NXiwfYJ" }).unless({
    path: [/\/api\/user\/login/],
  })
);

//! extra router
app.use(botRouter.routes(), botRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(jobsRouter.routes(), jobsRouter.allowedMethods());
app.use(uploadRouter.routes(), uploadRouter.allowedMethods());

// ! return home page
router
  .get("/", async (ctx) => {
    ctx.body = "Hello World";
  })
  .get("/api/admin/all", selectAll);

//! schedule tasks
schedule.scheduleJob("0 59 6 ? * * ", () => {
  shell.exec("node ./src/tasks/main.js");
});

//!listen port
app.listen(APP_PORT);
console.log(`APP is running on http://localhost:${APP_PORT}`);
