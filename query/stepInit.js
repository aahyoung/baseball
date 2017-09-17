module.exports = function(res, connection, v_user_key, gameIndex){
  var sql = 'INSERT INTO step VALUES(?,?)';
  connection.query(sql,[v_user_key, 1], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("step 1로 초기화");
     require('./showGames')(res, connection, v_user_key, gameIndex);
   }
  });
}
