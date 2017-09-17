exports.returnAddFriend = function(req, res) {
    var v_add_user_key = req.query.user_key;
    console.log("*** friend.returnAddFriend =====================================")
    console.log("*** v_add_user_key : " + v_add_user_key)

    res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});

	  res.end();
};


exports.returnDelFriend = function(req, res) {
    var v_del_user_key = req.params.user_key;
    console.log("*** friend.returnDelFriend =====================================")
    console.log("*** v_del_user_key : " + v_del_user_key)

    if(v_del_user_key == null) {
	    res.status(400).send("Invalid parameter")
	  } else {
	  	res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});
	  }

	  res.end();
};
