const mysql = require("mysql");

const mysqlConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: dingtalkbot,
};
const connection = mysql.createConnection(mysqlConfig);

module.exports = connection;
