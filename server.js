var io = require('socket.io')(process.env.Port || 3000);

var shortid = require('shortid');

console.log('server started');
var playercount = 0;

io.on('connection',function(socket){

    var thisClientId = shortid.generate();

    console.log('client connected, broadcasting spawn, id:', thisClientId);

    socket.broadcast.emit('spawn',{id: thisClientId});
    playercount++;
    for(i=0 ; i < playercount; i++){
        socket.emit('spawn');
        console.log('sending spawn to new player');
    }

    socket.on('move',function(data)
    {
        data.id = thisClientId;
        console.log('client move',data);

        socket.broadcast.emit('move',data)
    });

    socket.on('disconnect',function (){
        console.log('client disconnected');
        playercount--;
    })
})