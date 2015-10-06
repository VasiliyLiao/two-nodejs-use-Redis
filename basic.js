var net = require('net');
var process = require('process');
var Redis = require('ioredis');

var redisSend = new Redis();
var redisReceive = new Redis();

var client = [];
var countID = 0;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        client[0].write(chunk);
    }
});

redisReceive.subscribe('channel1', function (err, count) {
});

redisReceive.on('message', function (channel, data) {
    data=JSON.parse(data);
    client[data.id].write(data.message);
    console.log('To User'+data.id);
});

var tcp = net.createServer(function (socket) {
    console.log('CONNECTED:' + socket.remotePort + ' Port.');
    var id = countID;
    client[id] = socket;
    countID++;
    socket.on('data', function (data) {
        console.log('TCP data: ' + data);
        socket.write('You said: ' + data);
        var result = {
            id:id,
            message:data
        };
        redisSend.publish('channel2', JSON.stringify(result));
    });

    socket.on('error', function (error) {
        console.log(error);
    });

    socket.on('close', function (data) {
        console.log('CLOSED: ' + socket.remotePort);
        delete client[id];
    });

});


tcp.listen(6969, function () {
    console.log('TCP Server listening on 6969 Port.');
});

