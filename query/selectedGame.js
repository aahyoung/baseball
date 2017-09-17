module.exports = function(res, connection, v_user_key, v_content, gameIndex){
  var selectOfUser = require('./selectOfUser');
  var userSelectedGameNumber = gameIndex[parseInt(v_content)-1];

  console.log("userSelectedGameNumber"+userSelectedGameNumber);

  console.log("selectedGame 동작");

  var sql = 'SELECT * FROM user WHERE user_key=?';
  connection.query(sql, [v_user_key], function(err, first){
   if(err){
     console.log(err);
     res.status(500).send('Internal Server Error');
   }
   else{
     if(first.length == 0){
       //회원이 아닌 경우
       console.log("first::"+first);
     }else{
       var sql = 'SELECT no, DATE_FORMAT(date_time, "%Y년 %c월 %e일") AS date, DATE_FORMAT(date_time, "%H:%i") AS time FROM game WHERE no=?';
       connection.query(sql, [userSelectedGameNumber], function(err, second){
         if(err){
             console.log(err);
             return callback(err);
         } else {
           var message = '';
           message += '반갑습니다, '+first[0].name+' 고객님!\n';
           message += second[0].date+' '+second[0].time+' 경기를 선택하셨습니다.\n\n야구 예매를 계속해서 진행하시겠습니까?\n\n1. 다음단계';
           selectOfUser.init(res, connection, v_user_key, second[0].no);
           res.status(200).send(
           {
             "message": {
               "text": message
             }
           });

         }
       });
     }
   }
  });

}
