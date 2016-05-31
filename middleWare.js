var middleWare = {
	logger: function(request,response,next){
		console.log("request: "+ request.method+"->  '" +request.originalUrl + "' at ("+ new Date().toString()+")");
		next();
	},
	Auth: function(request,response,next){
		console.log("View Hit!!!");
		next();
	}
}


module.exports = middleWare;