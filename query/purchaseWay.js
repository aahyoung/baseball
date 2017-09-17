module.exports = function(res, connection){
  var message = '결제 수단을 선택하여 주세요.\n1. 카카오페이 결제\n2. 신용카드 결제\n3. 무통장 입금';
  res.status(200).send(
  {
    "message": {
      "text": message
    }
  });
}
