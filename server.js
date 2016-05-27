var express = require('express');
var app = express();
var SHA256 = require("crypto-js/sha256")
var middleWare = require('./middleWare.js');
var unirest = require('unirest');
var USER_ACCESS_TOKEN = ''
var APP_ID = '';

var USER_1 = '';


app.use(middleWare.logger);


app.get('/about',middleWare.Auth,function(request,response){
	response.send('About Us');
});
///amf/:id/:accessToken/:friendsId

app.get('/amf/:id/:accessToken/:friendsId',function(request,response){
	var id = request.get.params.id;
	var accessToken = request.params.accessToken;
	var friendsId  = request.params.friendsId;

	var app_proof = SHA256(accessToken, APP_SECRET);
	//var request = unirest.get('https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)')
	unirest.get('https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)')
		.send({ "access_token" : accessToken, "appsecret_proof": app_proof})
		.end(function (response) {
  		console.log(response.body);
	});
}

app.get('/test',function(request,response){

	var app_proof = SHA256(USER_ACCESS_TOKEN, APP_SECRET);
	//var id = request.get.params.id;
	//var accessToken = request.params.accessToken;
	//var friendsId  = request.params.friendsId;
	//var request = unirest.get('https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)')

	unirest.get('https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)')
		.send({ "access_token" : USER_ACCESS_TOKEN, "appsecret_proof": app_proof})
		.end(function (response) {
  		console.log(response.body);
	});

	//CALL = 762088223834224?fields=context.fields(mutual_friends) 
	//876817392379251

});


app.use(express.static(__dirname+"/public"));

app.listen(3100,function(){
	console.log('Server running on port number 3100');
});
