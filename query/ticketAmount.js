module.exports = function(res, connection, v_content, v_user_key, discount_price,discount_way){

var selectOfUser = require('./selectOfUser');

  var sql = 'SELECT seat_info FROM select_of_user WHERE user_key=?';
  connection.query(sql,[v_user_key], function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
        selectOfUser.priceUpdate(res, connection, v_user_key, discount_price[v_content-1],discount_way[v_content-1]);
        var message=''+result[0].seat_info;
        message+= '석을 선택하셨네요.\n티켓 매수를 숫자로 입력해 주세요.' ;
        res.status(200).send(
        {
          "message": {
            "text": message
          }
        });
    }
  });



}
