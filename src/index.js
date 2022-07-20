const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const {APP_PORT} = require('./config/default');
const app = new Koa();
const router = new Router();

//data service
const {
  botSelectByUid,
  s_insert,
  s_update,
  s_del,
} = require('./service/bot.service');
const {
  u_select,
  u_insert,
  u_update,
  u_del,
} = require('./service/user.service');
const {
  d_select,
  d_insert,
  d_update,
  d_del,
} = require('./service/jobs.service');

const {
  sel,
  ins,
  del,
  upd,
} = require('./router/routes');

// 跨域设置
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


// ! home page
router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});


// todo user router
// router
//   .get(sel('sender'), s_select)
//   .post(ins('sender'), s_insert)
//   .put(upd('sender'), s_update)
//   .delete(del('sender'), s_del);

// todo bot router
router
  .post(sel('bot'), botSelectByUid);
//   .post(ins('user'), u_insert)
//   .put(upd('user'), u_update)
//   .delete(del('user'), u_del);


// todo jobs router
// router
//   .get(sel('data'), d_select)
//   .post(ins('data'), d_insert)
//   .put(upd('data'), d_update)
//   .delete(del('data'), d_del);

//listen port
app.listen(APP_PORT);
console.log(`APP is running on http://localhost:${APP_PORT}`);
