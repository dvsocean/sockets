var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//Routes
app.get('/contact', function(req, res){
	res.sendFile(__dirname + '/public/view/contact.html');
});

//Sockets
io.on('connection', function(socket){
	console.log("USER CONNECTED VIA SOCKET.IO");
	
	socket.on('message', function(message){
		message.timestamp = moment().valueOf();
		console.log("data received: " + message.text);
		//broadcast emits to every browser but my own
		io.emit('message', message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the app, have fun but it will soon self destruct',
		timestamp: moment().valueOf()
	});
});

//Listen
http.listen(PORT, function(){
	console.log("Server started");
});
