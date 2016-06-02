var express = require('express');
var app = express();
//var SHA256 = require("crypto-js/hmac-sha256.js")
var Crypto = require("crypto-js");
var middleWare = require('./middleWare.js');
var unirest = require('unirest');
var USER_ACCESS_TOKEN = 'EAAOcRXpJKFMBAFqy9frydh4rKSf3Np3ajlG8JFwG7v3np8JRtWs71AH0w0unibOxsJOP46h50kdFsUZBGPBs5xBkkEzK0dURgfgZAGK7yBEHz8TTQgAIyuAQiVy74s8IWFANRDfxpc1RH5nI3zEnIAujsvq74hZCoSkEaNUgkCdtDCBuEZCB';
var APP_ID = '1016247148423251';
var APP_SECRET = '901271404bee861b0810763d5d4ca8d4';


var USER_1 = '';


app.use(middleWare.logger);


app.get('/about',middleWare.Auth,function(request,response){
	response.send('About Us');
});
///amf/:id/:accessToken/:friendsId
//1134529013256808
//10103957531646684

app.get('/amf/:id/:accessToken/:friendsId',function(request,response){
	var id = request.get.params.id;
	var accessToken = request.params.accessToken;
	var friendsId  = request.params.friendsId;
	var app_proof = Crypto.HmacSHA256(accessToken, APP_SECRET);

	var hexproof = app_proof.toString(Crypto.enc.Hex);
	//var request = unirest.get('https://graph.facebook.com/762088223834224?fields=context.fields(mutual_friends)')
	var url = "https://graph.facebook.com/"+ friendsId + "?" + "fields=context.fields(mutual_friends)&access_token=" + access_token + "&appsecret_proof=" + hexproof;
	unirest.get(url)
		.end(function (response) {
  		console.log(response.body);
	});
		

});

//Call with PHP generated hash
app.get('/test',function(request,response){

	var app_proof = Crypto.hmacSH256(USER_ACCESS_TOKEN, APP_SECRET); //not sure which parameter should come first
	//console.log(app_proof);
	var hexproof = app_proof.toString(Crypto.eng.Hex);
  	console.log(hashInBase64);

  	var urlString = "https://graph.facebook.com/1134529013256808?fields=context.fields(mutual_friends)&access_token=EAACEdEose0cBADdNjsZBh2SQf6DUToeZC81YXonvC9SyMvgi2n19wBhaWKt4f4Y0wEER7JUTZBFYOteXi9nI3LGDdmVLO9Led5ZCpa7SwbnCsqWqbBX5JacBmRIB0wck4N89JgZAlkzOpwJulnfR9qLIindsj0BhBq8TBJJxnZCIRNci2YIPHk&appsecret_proof=" + hashInBase64;
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

	var app_proof = Crypto.HmacSHA256(USER_ACCESS_TOKEN, APP_SECRET); //not sure which parameter should come first
	//console.log(app_proof);
	var hexproof = app_proof.toString(Crypto.enc.Hex);

  	//var access_token = "EAAOcRXpJKFMBAOwxoJFbyQHion1pYxW99iVZCDrNDp6ImuyimQ3NfzG77Y2iCwB7cDgH8HKf1QGldZAOCKnlmjqvs5AROwoUo8zeIwIk2cJM0rjoBYibZAIj2U1xZBunYmTFHx6j73ZBy0ff68YIakVhm0FXni8mo0ZBV5avGuZAY5DUmhnahHf";
  	var urlString = "https://graph.facebook.com/10103957531646684?fields=context.fields(mutual_friends)&access_token=" + USER_ACCESS_TOKEN + "&appsecret_proof=" + hexproof;
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
