const Router = require("@koa/router");
const userRouter = new Router({
  prefix: "/api/user",
});
const {
  userSelectByUid,
  userInsert,
  userUpdateByUid,
  userDeleteByUid,
} = require("../service/user.service");

userRouter.get("/query", userSelectByUid);
userRouter.post("/insert", userInsert);
userRouter.put("/update", userUpdateByUid);
userRouter.delete("/delete/:uid", userDeleteByUid);

module.exports = userRouter;
