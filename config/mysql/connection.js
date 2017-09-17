module.exports = function(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Hanium3!',
    database : 'kakao'
  });

  connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
  });

  return connection;
}
