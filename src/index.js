const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
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
app.use(require('koa-static')(__dirname + '/public/dist/'))
app.use(require('koa-static')(__dirname + '/public/upload/'))
//! 错误处理

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
schedule.scheduleJob("0 0 10,14,16 * * ? ", () => {
  console.log("执行了！");
  shell.exec("node ./src/tasks/main.js");
});

//!listen port
app.listen(APP_PORT);
console.log(`APP is running on http://localhost:${APP_PORT}`);
