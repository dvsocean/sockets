var socket = io();

socket.on('connect', function(){
	console.log('CONNECTED TO SOCKET/EXPRESS SERVER!');
});

socket.on('message', function(message){
	console.log("Incoming..");
	console.log(message.text);

	$('.messages').append('<p>' + message.text + '</p>');
});

//handles submitting form data
var $form = $('#message-form');

$form.on('submit', function(event){
	event.preventDefault();
	$message = $form.find('input[name=message]');
	socket.emit('message', {
		text: $message.val()
	});
	$message.val('');
});