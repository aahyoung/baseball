module.exports = function(res, connection, v_content){
  var sql = 'SELECT DATE_FORMAT(date_time, "%c/%e") AS date, DATE_FORMAT(date_time, "%H:%i") AS time, place, team1, team2 FROM game';
  connection.query(sql, function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      if(v_content === '경기 일정'){
        var message = '현재 경기 일정은 ';
        if(result.length==0){
          message += '없습니다.';
        }else{
          message += '\n\n'
          for(var i in result){
            if(!result[i].result){
              message += '날짜 : '+result[i].date+'\n시간 : '+result[i].time+'\n장소 : '+result[i].place+'\n'+result[i].team1+' VS '+result[i].team2;
              message += '\n--------------------\n'
            }
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
              "티켓 구매 확인"]
          }
        });
      }
    }
  });
}
