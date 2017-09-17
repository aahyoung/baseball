module.exports = function(res, v_content){
  if(v_content === 'LG 트윈스 홈페이지'){
    res.status(200).send(
      {
        "message": {
          "text": "LG 트윈스 홈페이지로 바로 가시고 싶으신가요?\n아래의 링크를 클릭해주세요~",
          "photo": {
            "url": "http://imgnews.naver.net/image//480/2016/07/02/sptPostArticleImage-5831.jpg?type=w540",
            "width": 640,
            "height": 480
          },
          "message_button": {
            "label": "LG 트윈스",
            "url": "http://www.lgtwins.com/"
          }
        },
        "keyboard": {
          "type": "buttons",
          "buttons": [
            "경기 일정",
            "티켓 구매",
            "티켓 구매 확인"
          ]
        }
      }
    );
  }
}
