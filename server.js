var express = require('express');
var app = express();
var crypto = require('cryptojs')
var middleWare = require('./middleWare.js');
var unirest = require('unirest');
var USER_ACCESS_TOKEN = ''
var APP_SECRET = ''
var APP_ID = ''

//CALL = {friend's ID}?fields=context.fields(mutual_friends)
app.use(middleWare.logger);


app.get('/about',middleWare.Auth,function(request,response){
	response.send('About Us');
});

app.get('/amf/:id/:accessToken/:friendsId',function(request,response){

	var app_proof = crypto.HmacSHA256(USER_ACCESS_TOKEN , APP_SECRET);
	var id = request.get.params.id;
	var accessToken = request.params.accessToken;
	var friendsId  = request.params.friendsId;
	var Request = unirest.get('https://graph.facebook.com');

});


app.use(express.static(__dirname+"/public"));

app.listen(3100,function(){
	console.log('Server running on port number 3100');
});
