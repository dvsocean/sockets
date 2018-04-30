var socket = io();
var name = getQueryVariable('name') || 'Name not defined!!';
var room = getQueryVariable('room') || 'Throne room';

$('#get-params').click(function(){
	$('.query-params').html('Hello ' + name + ', you just joined ' + room);
});

socket.on('connect', function(){
	console.log('CONNECTED TO SOCKET/EXPRESS SERVER!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	$message = $('.messages');
	console.log("Incoming..");
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong> : ');
	$message.append(message.text + '</p>');

	// $('.messages').append('<p><strong>'+momentTimestamp.local().format('h:mm a')+'</strong> : ' + message.text + '</p>');
});

//handles submitting form data
var $form = $('#message-form');

$form.on('submit', function(event){
	event.preventDefault();
	$message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});











