module.exports = function(res,connection,v_user_key,v_content){

var selectOfUser = require('./selectOfUser');

  var sql = 'SELECT * FROM select_of_user WHERE user_key=?';
  connection.query(sql,[v_user_key], function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      selectOfUser.buyingUpdate(res, connection, v_user_key, v_content);
      var total=result[0].price*parseInt(v_content);
      var message='';
      message += result[0].seat_info +' '+v_content+'매를 선택하셨네요.\n'
      + result[0].discount_way + '할인이 적용되어 '+ total+'원 입니다.\n\n'
      +'다음 단계로 넘어가길 원하신다면\n 1. 결제';

      res.status(200).send(
      {
        "message": {
          "text": message
        }
      });
    }
  });


}
