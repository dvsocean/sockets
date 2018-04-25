var socket = io();

socket.on('connect', function(){
	console.log('CONNECTED TO SOCKET/EXPRESS SERVER!');
})