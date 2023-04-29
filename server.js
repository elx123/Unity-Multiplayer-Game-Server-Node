var io = require('socket.io')(process.env.Port || 3000);

console.log('server started');
var playercount = 0;

io.on('connection',function(socket){
    console.log('client connected');

    socket.broadcast.emit('spawn');
    playercount++;
    for(i=0 ; i < playercount; i++){
        socket.emit('spawn');
        console.log('sending spawn to new player');
    }

    socket.on('move',function(data)
    {
        console.log('client move');
    });

    socket.on('disconnect',function (){
        console.log('client disconnected');
        playercount--;
    })
})