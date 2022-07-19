const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.mysql);

module.exports = connection;
