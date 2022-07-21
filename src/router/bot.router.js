const Router = require("koa-router");
const botRouter = new Router({
  prefix: "/api/bot",
});
const {
  botSelectByUid,
  botInsert,
  botUpdateByBotId,
  botDeleteByBotId,
} = require("../service/bot.service");

botRouter.get("/query", botSelectByUid);
botRouter.post('/insert', botInsert);
botRouter.put('/update', botUpdateByBotId);
botRouter.delete('/delete/:botId', botDeleteByBotId);

module.exports = botRouter;
