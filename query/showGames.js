module.exports = function(res, connection, v_user_key, gameIndex){
  var async = require('async');
  var message = '무적 LG! 오늘도 LG트윈스 야구 예매를 이용해주셔서 감사합니다.\n\n예매할 경기를 선택해주세요.\n\n';
  var tasks = [
   //function1: read games from db
   function (callback) {
     var sql = 'SELECT no, DATE_FORMAT(date_time, "%Y년 %c월 %e일") AS date, DATE_FORMAT(date_time, "%H:%i") AS time, place, team1, team2, sellout FROM game';
     connection.query(sql, function(err, result){
       if(err){
           console.log(err);
           return callback(err);
       } else {
           callback(null,result);
       }
     });
   },
   //function2: create message
   function (result, callback) {
     var notSelloutIndex = 0;
       for(var i in result)
       {
         if(result[i].sellout === '매진'){
           message += '(매진) '+result[i].date+' '+result[i].time+'\n'+result[i].place+'\n'+result[i].team1+' VS '+result[i].team2+'\n\n';
         }
       }
       for(var i in result)
       {
         if(!(result[i].sellout === '매진')){
           gameIndex[notSelloutIndex] = result[i].no; //game index for mapping with db
           notSelloutIndex++;
           message += notSelloutIndex+'. '+result[i].date+' '+result[i].time+'\n'+result[i].place+'\n'+result[i].team1+' VS '+result[i].team2+'\n';
         }
       }
       res.status(200).send(
       {
         "message": {
           "text": message
         }
       });
       callback(null);
   }
  ];
  async.waterfall(tasks, function (err) {
   if (err)
    console.log('err');
   else{
    console.log('done');
   }
  });
}
