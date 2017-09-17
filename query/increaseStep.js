module.exports = function(res, connection, v_user_key, step){
  var sql = 'UPDATE step SET step=? WHERE user_key=?';
  connection.query(sql,[step+1, v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("step++");
   }
  });
}
