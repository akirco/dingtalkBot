const Router = require("koa-router");
const jobsRouter = new Router({
  prefix: "/api/jobs",
});
const {
  jobSelectByBotId,
  jobInsert,
  jobUpdateByBotId,
  jobDeleteByBotId,
} = require("../service/jobs.service");

jobsRouter.get("/query", jobSelectByBotId);
jobsRouter.post("/insert", jobInsert);
jobsRouter.put("/update", jobUpdateByBotId);
jobsRouter.delete("/delete/:botId", jobDeleteByBotId);

module.exports = jobsRouter;
