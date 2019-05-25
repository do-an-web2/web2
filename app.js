var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'qlbh'
});

connection.connect();
var sql = 'SELECT 1 + 1 AS solution';

connection.query(sql, function (error, results, fields) {
    if (error){
        console.log(error);
    }else{
        console.log('The solution is: ', results);
    }
    connection.end();
});
console.log("Apter querying...");