const Router = require("@koa/router");
const uploadRouter = new Router({
  prefix: "/api/file",
});
const multer = require("@koa/multer");
const path = require("path");

const storage = multer.diskStorage({
  //文件存放路径
  destination: path.join(process.cwd(),"public/upload"),
  //文件名格式化
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now().toString()}.${type}`);
  },
});

const limit = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024 * 1024, //文件大小 单位 b
  files: 10, //文件数量
};

const upload = multer({ storage,limit });

uploadRouter.post("/upload", upload.array("image",10), async (ctx, next) => {
  try {
    ctx.body = {
      code: 200,
      message: "upload success!",
      data: ctx.files?ctx.files:"上传失败",
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: "upload failed!",
      data:"服务端异常！",
    };
  }
});

module.exports = uploadRouter;
