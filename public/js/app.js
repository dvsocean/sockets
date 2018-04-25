var socket = io();

socket.on('connect', function(){
	console.log('CONNECTED TO SOCKET/EXPRESS SERVER!');
});

socket.on('message', function(message){
	console.log("Incoming..");
	console.log(message.text);
});