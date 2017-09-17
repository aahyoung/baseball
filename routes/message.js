module.exports = function(){
    var route = require('express').Router();
    var connection = require('../config/mysql/connection')();
    var gameIndex = new Array();
    var seat_info_arr=new Array();
    var discount_price=new Array();
    var discount_way=new Array();

    route.post('/',function(req,res){
      var v_type = req.body.type;
      var v_user_key = req.body.user_key;
      var v_content = req.body.content;

      console.log("*** message---------------------------");
      console.log("*** type : " + v_type);
      console.log("*** user_key : " + v_user_key);
      console.log("*** content : " + v_content);
      console.log("*** ----------------------------------");

      require('../modules/homepage')(res, v_content); //홈페이지 링크
      require('../modules/fixture')(res, connection, v_content); //경기 일정 확인
      //경기 결과 확인
      require('../modules/purchaseCheck')(res, connection, v_content,v_user_key);
      require('../modules/purchase')(res, connection, v_content, v_user_key,gameIndex,seat_info_arr,discount_price,discount_way); //티켓 구매



    });
    return route;
}
