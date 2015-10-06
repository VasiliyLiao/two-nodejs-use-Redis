var Redis = require('ioredis');

var redisSend = new Redis();
var redisReceive = new Redis();

redisReceive.subscribe('channel2', function (err, count) {
});

redisReceive.on('message', function (channel, data) {
    data = JSON.parse(data);
    data.message = 'ok~';
    redisSend.publish('channel1', JSON.stringify(data));
});

