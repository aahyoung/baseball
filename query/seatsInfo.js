module.exports = function(res, connection, v_content, gameIndex,seat_info_arr){
  var userSelectedGameNumber = gameIndex[parseInt(v_content)-1];

  var sql = 'SELECT DATE_FORMAT(date_time, "%Y년 %c월 %e일") AS date, DATE_FORMAT(date_time, "%H:%i") AS time, team1, team2, place FROM game WHERE no=?';
  connection.query(sql, [userSelectedGameNumber], function(err, first){
    if(err){
        console.log(err);
        return callback(err);
    } else {
      var sql = 'SELECT * FROM seat INNER JOIN seats ON seat.seat_info = seats.seat_info WHERE no=?';
      connection.query(sql, [userSelectedGameNumber], function(err, second){


        var message = '';
        var temp = 1;

        message += first[0].team1+' VS '+first[0].team2+'\n'+first[0].place+'\n'+first[0].date+' '+first[0].time+'\n\n';
        for(var i in second){
           if(!(second[i].remaining===0))
           {
             seat_info_arr[temp] = second[i].seat_info;
             message += temp+'. ' +second[i].seat_info+'('+second[i].remaining+')\n';
             temp++;
           }
           else{
             message +="(매진) "+second[i].seat_info+'('+second[i].remaining+')\n';

           }
        }

        message += '\n좌석 블록을 선택해주세요\n';
        res.status(200).send(
        {
          "message": {
            "photo": {
              "url": "http://www.lgtwins.com/imgs/event/images/img_stadium_info.jpg",
              "width": 640,
              "height": 480
            },
            "text": message,
            "message_button": {
              "label": "좌석 배치도",
              "url": "http://www.lgtwins.com/imgs/event/stadium.html"
            }
          }
        });
        });

      }
    });
}
