module.exports = function(res){
  res.status(200).send(
  {
    "message": {
      "text": "잘못된 입력입니다. 확인후 재입력해주세요"
    }
  });
}
