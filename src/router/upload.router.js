const Router = require("@koa/router");
const uploadRouter = new Router({
  prefix: "/api/file",
});
const multer = require("@koa/multer");
const path = require("path");

const storage = multer.diskStorage({
  //文件存放路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../..", "/public/upload"));
  },
  //文件名格式化
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});

const limit = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024 * 1024, //文件大小 单位 b
  files: 1, //文件数量
};

const upload = multer({ storage, limit });
uploadRouter.get("/upload", upload.single("image"), async (ctx, next) => {
  try {
    ctx.body = {
      code: 200,
      message: "upload success!",
      data: ctx.file?ctx.file:null,
    };
  } catch (error) {}
});

module.exports = uploadRouter;
