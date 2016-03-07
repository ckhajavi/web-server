var express = require('express');
var app = express();
var middleWare = require('./middleWare.js');


app.use(middleWare.logger);

app.get('/about',middleWare.Auth,function(request,response){
	response.send('About Us');
});


app.use(express.static(__dirname+"/public"));

app.listen(3100,function(){
	console.log('Server running on port number 3100');
});
