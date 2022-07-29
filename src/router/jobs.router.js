const Router = require("@koa/router");
const jobsRouter = new Router({
  prefix: "/api/jobs",
});
const {
  jobSelectByBotId,
  jobSelectByUid,
  jobInsert,
  jobUpdateByBotId,
  jobBindBotId,
  jobDeleteByBotId,
} = require("../service/jobs.service");

jobsRouter.get("/query", jobSelectByBotId);
jobsRouter.get('/queryTasks',jobSelectByUid)
jobsRouter.post("/insert", jobInsert);
jobsRouter.put("/update", jobUpdateByBotId);
jobsRouter.put("/bindBot",jobBindBotId)
jobsRouter.delete("/delete/:botId", jobDeleteByBotId);

module.exports = jobsRouter;
