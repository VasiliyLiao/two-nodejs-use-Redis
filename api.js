var Redis = require('ioredis');

var redisSend = new Redis();
var redisReceive = new Redis();

redisReceive.subscribe('channel2', function (err, count) {
});

redisReceive.on('message', function (channel, data) {
    data = JSON.parse(data);
    console.log("user-" + data.id + " type something...");
    data.message = 'API Server:OK~';
    redisSend.publish('channel1', JSON.stringify(data));
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        chunk = chunk.split(",");
        var data = {
            id: chunk[0],
            message: 'API Server:' + chunk[1]
        };

        redisSend.publish('channel1', JSON.stringify(data));
    }
});