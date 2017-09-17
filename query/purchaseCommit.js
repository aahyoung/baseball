module.exports = function(res, connection, v_user_key){
  var sql = 'SELECT * FROM select_of_user WHERE user_key=?';
  connection.query(sql, [v_user_key], function(err, first){
    var sql = 'INSERT INTO purchase(user_key, no, seat_info, price, buying, purchase_way) VALUES(?,?,?,?,?,?)';
    connection.query(sql, [v_user_key, first[0].no, first[0].seat_info, first[0].price, first[0].buying, first[0].purchase_way], function(err, second){
     if(err){
       console.log(err);
       res.status(500).send('Internal Server Error');
     }
     else{
       console.log("구매 정보 셋팅");
     }
    });
  });
}
