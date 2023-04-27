var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function(socket) {
    console.log('Connected to server!');
});

// Emit a message event
socket.emit('message', 'Hello from client');

// Handle message event
socket.on('message', function(msg){
    console.log('Received message from server: ' + msg);
});

// Disconnect from server
socket.on('disconnect', function(){
    console.log('Disconnected from server');
});