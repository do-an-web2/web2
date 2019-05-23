var mysql      = require('mysql');
var db_config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'qlbh',
    port     : 8889
    }
var connection = mysql.createConnection(db_config);
connection.connect();
var sql = 'SELECT 1 + 1 AS solution';
var fn = () => {
    console.log('Hàm xử lý kết quả truy vấn');
}

connection.query(sql,fn);
console.log('After querying...');

connection.end();