var express = require('express');
var app = express();
//var SHA256 = require("crypto-js/hmac-sha256.js")
var Crypto = require("crypto-js");
var middleWare = require('./middleWare.js');
var unirest = require('unirest');
var APP_SECRET = '901271404bee861b0810763d5d4ca8d4';



app.use(middleWare.logger);


app.get('/about',middleWare.Auth,function(request,response){
	response.send('About Us');
});

//get the number of mutual friends "total_count"
app.get('/api/amf/:access_token/:friend_id',function(request,response){
	var access_token = request.params.access_token;
	var friend_id  = request.params.friend_id;
	var app_proof = Crypto.HmacSHA256(access_token, APP_SECRET);

	var hexproof = app_proof.toString(Crypto.enc.Hex);
	var url = "https://graph.facebook.com/"+ friend_id + "?" + "fields=context.fields(mutual_friends)&access_token=" + access_token + "&appsecret_proof=" + hexproof;
	unirest.get(url)
		.end(function (res) {
		var jresponse = JSON.parse(res.body);
  		response.send(jresponse["context"]["mutual_friends"]["summary"]);
  		//response.send(res.body);
	});
		

});

app.use(express.static(__dirname+"/public"));

app.listen(3100,function(){
	console.log('Server running on port number 3100');
});
