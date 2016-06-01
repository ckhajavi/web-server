var express = require('express');
var app = express();
var SHA256 = require("crypto-js/hmac-sha256.js")
var Crypto = require("crypto-js");
var middleWare = require('./middleWare.js');
var unirest = require('unirest');
var USER_ACCESS_TOKEN = 'EAACEdEose0cBADdNjsZBh2SQf6DUToeZC81YXonvC9SyMvgi2n19wBhaWKt4f4Y0wEER7JUTZBFYOteXi9nI3LGDdmVLO9Led5ZCpa7SwbnCsqWqbBX5JacBmRIB0wck4N89JgZAlkzOpwJulnfR9qLIindsj0BhBq8TBJJxnZCIRNci2YIPHk';
var APP_ID = '1016247148423251';
var APP_SECRET = '901271404bee861b0810763d5d4ca8d4';


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
		.headers({"access_token" : accessToken})
		.send({"appsecret_proof": app_proof})
		.end(function (response) {
  		console.log(response.body);
	});
});

//Call with PHP generated hash
app.get('/test',function(request,response){

	var app_proof = SHA256(APP_SECRET, USER_ACCESS_TOKEN); //not sure which parameter should come first
	//console.log(app_proof);
	var hashInBase64 = "69ada201f85074dde86e333b1ad8dfc8764eb23ffae3e0652559e152dd2a02cb";//manually put in with php code
  	console.log(hashInBase64);

  	var urlString = "https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)&access_token=EAACEdEose0cBADdNjsZBh2SQf6DUToeZC81YXonvC9SyMvgi2n19wBhaWKt4f4Y0wEER7JUTZBFYOteXi9nI3LGDdmVLO9Led5ZCpa7SwbnCsqWqbBX5JacBmRIB0wck4N89JgZAlkzOpwJulnfR9qLIindsj0BhBq8TBJJxnZCIRNci2YIPHk&appsecret_proof=" + hashInBase64;
	unirest.get(urlString)
		.end(function (response) {
  		console.log(response.body);
	});

	//CALL = 762088223834224?fields=context.fields(mutual_friends) 
	//876817392379251

});
app.get('/test1',function(request,response){

	var app_proof = SHA256(APP_SECRET, USER_ACCESS_TOKEN); //not sure which parameter should come first
	//console.log(app_proof);
	var hashInBase64 = Crypto.enc.Base64.stringify(app_proof);
  	console.log(hashInBase64);

	unirest.get('https://graph.facebook.com/762088223834224')
		.send({ "access_token" : USER_ACCESS_TOKEN, "appsecret_proof": hashInBase64, "fields" : "context.fields(mutual_friends)"})
		.end(function (response) {
  		console.log(response.body);
	});
});

app.get('/test2',function(request,response){

	var app_proof = SHA256(APP_SECRET, USER_ACCESS_TOKEN); //not sure which parameter should come first
	//console.log(app_proof);
	var hashInBase64 = "69ada201f85074dde86e333b1ad8dfc8764eb23ffae3e0652559e152dd2a02cb";//Crypto.enc.Base64.stringify(app_proof);
  	console.log(hashInBase64);

  	var urlString = "https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)&access_token=EAACEdEose0cBADdNjsZBh2SQf6DUToeZC81YXonvC9SyMvgi2n19wBhaWKt4f4Y0wEER7JUTZBFYOteXi9nI3LGDdmVLO9Led5ZCpa7SwbnCsqWqbBX5JacBmRIB0wck4N89JgZAlkzOpwJulnfR9qLIindsj0BhBq8TBJJxnZCIRNci2YIPHk&appsecret_proof=" + hashInBase64;
	unirest.get(urlString)
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
