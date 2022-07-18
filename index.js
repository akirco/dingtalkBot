const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const config = require('./config');
const app = new Koa();
const router = new Router();
const port = config.app.port;
//data service
const {
  s_select,
  s_insert,
  s_update,
  s_del,
} = require('./service/sender.service');
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
} = require('./service/data.service');

const {
  selectRoute,
  insertRoute,
  delRoute,
  updateRoute,
} = require('./router/routes');

// 跨域设置
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router
  .get(selectRoute('sender'), s_select)
  .post(insertRoute('sender'), s_insert)
  .put(updateRoute('sender'), s_update)
  .delete(delRoute('sender'), s_del);

router
  .get(selectRoute('user'), u_select)
  .post(insertRoute('user'), u_insert)
  .put(updateRoute('user'), u_update)
  .delete(delRoute('user'), u_del);

router
  .get(selectRoute('data'), d_select)
  .post(insertRoute('data'), d_insert)
  .put(updateRoute('data'), d_update)
  .delete(delRoute('data'), d_del);

//listen port
app.listen(port);
console.log(`Server listening on port ${port}`);
