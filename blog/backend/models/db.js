//MYSQL 서버 설정
const mysql = require('mysql2');
const dbConfig = require("../config/db.config.js")
const con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

//MYSQL 연결
con.connect(err=>{
  if (err) throw err;
  console.log('DB연결 성공');
});

module.exports = con;