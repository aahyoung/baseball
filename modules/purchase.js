module.exports = function(res, connection, v_content, v_user_key, gameIndex, seat_info_arr, discount_price, discount_way){
	var sql = 'SELECT step FROM step WHERE user_key=?';
	connection.query(sql,[v_user_key], function(err, result){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}else {
			if(result.length == 0)
			{
				if(v_content === '티켓 구매'){
					require('../query/stepInit')(res, connection, v_user_key, gameIndex);
				}
			}
			else {
				if(result[0].step == 1){  //게임선택해서 메시지로 전송및 사용자 정보확인
					if(parseInt(v_content)>=1 && parseInt(v_content)<=gameIndex.length)
					{
						require('../query/selectedGame')(res, connection, v_user_key, v_content, gameIndex);
						require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
					}
					else {
						require('../modules/errorPage')(res);
					}
				}else if(result[0].step == 2){
					//v_content 가 1이면 스템 증가 및 ppt 17 출력
					if(v_content==='1')
					{
						require('../query/seatsInfo')(res, connection, v_content, gameIndex,seat_info_arr);
						require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
					}
					else
					{
						require('../modules/errorPage')(res);
					}
				}else if(result[0].step == 3){

					if(parseInt(v_content)>=1 && parseInt(v_content)<seat_info_arr.length )
					{
						require('../query/selectedSeat')(res, v_user_key, connection, v_content, seat_info_arr, discount_price, discount_way);
						require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
					}
					else
					{
						require('../modules/errorPage')(res);
					}
				}else if(result[0].step == 4){
					if(parseInt(v_content)>=1 && parseInt(v_content)<discount_way.length )
					{
						require('../query/ticketAmount')(res,connection, v_content, v_user_key, discount_price, discount_way);
						require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
					}
					else
					{
						require('../modules/errorPage')(res);
					}
				}else if(result[0].step == 5){
					require('../query/checkData')(res,connection,v_user_key,v_content);
					require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
				}else if(result[0].step == 6){
					if(v_content === '1'){
						require('../query/purchaseWay')(res,connection);
						require('../query/increaseStep')(res, connection, v_user_key, result[0].step);
					}else{
						require('../modules/errorPage')(res);
					}
				}else if(result[0].step == 7){
					if(v_content === '1'){ //카카오페이 결제
						require('../query/pay')(res, connection, v_user_key, '카카오 페이');
					}else if(v_content === '2'){ //신용카드 결제
						require('../query/pay')(res, connection, v_user_key, '신용 카드');
					}else if(v_content === '3'){ //무통장 입금
						require('../query/pay')(res, connection, v_user_key, '무통장 입금');
					}else{
						require('../modules/errorPage')(res);
					}
				}
				//마지막 단계 또는 주문 취소 경우 step=0으로 초기화!!
			}
		}
	});
}
