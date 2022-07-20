const mysql = require("mysql");
const {MYSQL_HOST,MYSQL_PORT,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE} = require("../config/default");
const mysqlConfig = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

const pool = mysql.createPool(mysqlConfig);

module.exports = pool;
