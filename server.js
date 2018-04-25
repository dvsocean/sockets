var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log("USER CONNECTED VIA SOCKET.IO");

	socket.on('message', function(message){
		console.log("data received: " + message.text);
		socket.broadcast.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the app, have fun cause it will self destruct in 5 seconds'
	});
});

http.listen(PORT, function(){
	console.log("Server started");
});