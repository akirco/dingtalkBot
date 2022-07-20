const pool = require('./pool');
const connection = require('./connection');
function excuteSql(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
}

function excuteSqlConn(sql, values) {
  return new Promise((resolve, reject) => {
    connection.connect();
    connection.query(sql, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
    connection.end();
  });
}

module.exports = {
  excuteSql,
  excuteSqlConn,
};
