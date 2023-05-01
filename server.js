var io = require('socket.io')(process.env.Port || 3000);

var shortid = require('shortid');

console.log('server started');

var players = [];

io.on('connection',function(socket){

    var thisPlayerId = shortid.generate();

    console.log('client connected, broadcasting spawn, id:', thisPlayerId);

    players.push(thisPlayerId);

    //这里是给所有服务器的socketd通报
    socket.broadcast.emit('spawn',{id: thisPlayerId});

    //这个是给当前用户生成已经连接的玩家角色
    players.forEach(function(playerId){
        if(playerId == thisPlayerId)
            return;

        socket.emit('spawn',{id:playerId})
        console.log('sendtng spawn to new player for id: ', playerId);
    });

    socket.on('move',function(data)
    {
        data.id = thisPlayerId;
        console.log('client move',data);

        socket.broadcast.emit('move',data)
    });

    socket.on('disconnect',function (){
        players.splice(players.indexOf(thisPlayerId),1);
        console.log('client disconnected'+thisPlayerId);

        socket.broadcast.emit('disconnected',{id: thisPlayerId});
        console.log('client disconnected22222222');
    })
})