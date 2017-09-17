module.exports = function(res, connection, v_user_key){
  var sql = 'DELETE FROM step WHERE user_key=?';
  connection.query(sql,[v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("step 삭제");
   }
  });
}
