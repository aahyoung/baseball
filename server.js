var express = require('express');
var bodyParser = require('body-parser');

var keyboardObj = require('./routes/keyboard');
var messageObj = require('./routes/message')();
var friendObj = require('./routes/friend');
var chatroomObj = require('./routes/chat_room');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//keyboard
app.get('/keyboard', keyboardObj.returnAlive);

//message
app.use('/message', messageObj);

//friend
app.post('/friend', friendObj.returnAddFriend);
app.delete('/friend/:user_key', friendObj.returnDelFriend);

//chat_room
app.delete('/chat_room/:user_key', chatroomObj.returnOutChat);

app.listen(80);
console.log('Listening on port 80...');
