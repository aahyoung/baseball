module.exports = function(res, connection, v_content, user_key){
  if(v_content === '티켓 구매 확인'){
    var sql = 'SELECT DATE_FORMAT(date_time, "%c/%e") AS date, DATE_FORMAT(date_time, "%H:%i") AS time, place, team1, team2, purchase.* FROM purchase INNER JOIN game ON purchase.no=game.no where user_key=?';
    connection.query(sql, [user_key] ,function(err, result, fields){
      if(err){
  			console.log(err);
  			res.status(500).send('Internal Server Error');
  		}else{
        var message = '';
        if(result.length == 0){
          message += '구매정보가 없습니다.';
        }else{
          message += '티켓 구매정보 확인\n\n';
          for(var i in result){
            var total = result[i].price * result[i].buying;
            message +='경기 정보: \n날짜 및 시간 : '+result[i].date+' '+result[i].time+'\n장소 : '+result[i].place+'\n'+result[i].team1+' VS '+result[i].team2+'\n';
            message +='티켓 금액: '+ result[i].price+'\n';
            message +='좌석: '+result[i].seat_info+'\n';
            message +='매수: '+result[i].buying+'\n';
            message +='총 결제금액: '+total+'\n';
            message +='결제방식: '+result[i].purchase_way+'\n';
            message +='-----------------------'+'\n';
          }
        }
        res.status(200).send(
          {
            "message": {
            "text": message
          },
            "keyboard": {
            "type": "buttons",
            "buttons": [
                        "LG 트윈스 홈페이지",
                        "티켓 구매",
                        "티켓 구매 확인"
            ]
          }
        });
      }
    });
  }
}
