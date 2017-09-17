exports.init = function(res, connection, v_user_key, no){
  var sql = 'INSERT INTO select_of_user(user_key, no) VALUES(?,?)';
  connection.query(sql,[v_user_key, no], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("select_of_user 셋팅");
   }
  });
}

exports.seatInfoUpdate = function(res, connection, v_user_key, seat_info){
  var sql = 'UPDATE select_of_user SET seat_info=? WHERE user_key=?';
  connection.query(sql,[seat_info, v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("seat_info 셋팅");
   }
  });
}

exports.priceUpdate = function(res, connection, v_user_key, price,discount_way){
  var sql = 'UPDATE select_of_user SET price=?, discount_way=? WHERE user_key=?';
  connection.query(sql,[price, discount_way, v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("price 셋팅");
   }
  });
}

exports.buyingUpdate = function(res, connection, v_user_key, buying){
  var sql = 'UPDATE select_of_user SET buying=? WHERE user_key=?';
  connection.query(sql,[buying, v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("buying 셋팅");
   }
  });
}

exports.purchaseWayUpdate = function(res, connection, v_user_key, purchaseWay){
  var sql = 'UPDATE select_of_user SET purchase_way=? WHERE user_key=?';
  connection.query(sql, [purchaseWay, v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("purchaseWay 셋팅");
   }
  });
}

exports.delete = function(res, connection, v_user_key){
  var sql = 'DELETE FROM select_of_user WHERE user_key=?';
  connection.query(sql, [v_user_key], function(err, result){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     console.log("정상삭제");
   }
  });
}
