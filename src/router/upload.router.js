const Router = require("@koa/router");
const multer = require("@koa/multer");
const uploadRouter = new Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public"));
  },
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
uploadRouter("/upload", upload.single("file"), async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "upload success!",
    data: ctx.file,
  };
});

module.exports = uploadRouter;
