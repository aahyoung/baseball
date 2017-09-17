module.exports = function(res, v_user_key, connection, v_content, seat_info_arr,discount_price,discount_way){
  var selectOfUser = require('./selectOfUser');
  var temp = parseInt(v_content);
  var seat_info = seat_info_arr[temp];
  selectOfUser.seatInfoUpdate(res, connection, v_user_key, seat_info);

  var sql = 'SELECT price FROM seats WHERE seat_info=?';
  connection.query(sql, [seat_info], function(err, first){
    var sql = 'SELECT * FROM discount';
    connection.query(sql, function(err, second){
      var message = '';
      var count = 1;
      for(var i in second){

        var dis_price = first[0].price*(1-second[i].discount_rate/100);
        discount_price[i]=dis_price;
        discount_way[i]=second[i].discount_way;
        message += count+'. '+second[i].discount_way+'('+dis_price+')\n';
        count++;
      }
      message += '\n할인 방법을 선택해 주세요.\n';
      res.status(200).send(
      {
        "message": {
          "text": message
        }
      });
    });
  });

}
