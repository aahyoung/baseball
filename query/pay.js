module.exports = function(res, connection, v_user_key, purchaseWay){
  var selectOfUser = require('./selectOfUser');
  var message ='';
  selectOfUser.purchaseWayUpdate(res, connection, v_user_key, purchaseWay);

  var sql = 'SELECT * FROM select_of_user WHERE user_key=?';
  connection.query(sql, [v_user_key], function(err, first){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      var sql = 'SELECT name FROM user WHERE user_key=?';
      connection.query(sql, [v_user_key], function(err, second){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }else {
          require('./purchaseCommit')(res, connection, v_user_key);
          var total = first[0].price * first[0].buying;
          message += '주문이 완료되었습니다!\n\n1.주문자 : '+second[0].name+'\n티켓 금액 : '+first[0].price+'\n할인 : '+first[0].discount_way+'\n좌석 : '+first[0].seat_info+'\n매수 : '+first[0].buying+'\n총 결제금액 : '+total+'\n결제방식 : '+first[0].purchase_way+'\n\n';
          message += '티켓수령 방식을 선택해주세요.\n1.현장발권\n2.SMS 티켓';
          require('./stepDelete')(res, connection, v_user_key);  //step 초기화
          selectOfUser.delete(res, connection, v_user_key); //정보삭제

          res.status(200).send(
          {
            "message": {
              "text": message
            },
            "keyboard": {
              "type": "buttons",
              "buttons": [
                'LG 트윈스 홈페이지',
                '경기 일정',
                '티켓 구매',
                '티켓 구매 확인'
              ]
            }
          });
        }
      });
    }
  });
}
