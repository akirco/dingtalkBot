const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const { APP_PORT } = require("./config/default");
const botRouter = require("./router/bot.router");
const userRouter = require("./router/user.router");
const jobsRouter = require("./router/jobs.router");
const { selectAll } = require("./service/admin.service");
const app = new Koa();
const router = new Router();

// 跨域设置
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

//? extra router
app.use(botRouter.routes(), userRouter.routes(), jobsRouter.routes());
app.use(
  botRouter.allowedMethods(),
  botRouter.allowedMethods(),
  jobsRouter.allowedMethods()
);

// ! return home page
router
  .get("/", async (ctx) => {
    ctx.body = "Hello World";
  })
  .get("/api/admin/all", selectAll);

//listen port
app.listen(APP_PORT);
console.log(`APP is running on http://localhost:${APP_PORT}`);
