'use strict';
var uuid = require('uuid');
var Redis = require('ioredis');
var config = require('../config').data.cache;

var sessions = null;
var keyPrefix = '';
var keyPrefixLen = 0;
var client = null;
var cache = null;
var EXPIRE_TIME = 60*30;

function keyWrapper(key) {
    return keyPrefix+key;
}
function keyStrip(key) {
    return key.slice(keyPrefixLen);
}

exports.init = function(cacheMou, cb) {
    cache = cacheMou;
    if (!config) {
        cb(new Error('Failed to init session, please check if config file exist.'));
        return;
    }

    sessions = config.sessions;
    if (sessions.use === "cluster") {        
        var cluster = new Redis.Cluster(config.cluster);
        if (!cluster) {
            cb(new Error('Failed to init session, please check cluster deployment according to the config file.'));
            return;
        }
        client = cluster;
    } else { //standalone
        var cacheConfig = config.standalone[sessions.name];
        client = new Redis({
            host: cacheConfig.host,
            port: cacheConfig.port,
            db: cacheConfig.dbNum
        });
    }
    keyPrefix = sessions.prefix;
    keyPrefixLen = keyPrefix.length;
};

exports.createSession = function(cb) {
    var token = uuid.v4();
    var key = keyWrapper(token);
    var date = Date.now();

    client.hset(key, "create_on", date, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            client.expire(key, EXPIRE_TIME);
            cb(null, token);
        }
    });
};

exports.clearSession = function(token, cb) {
    var key = keyWrapper(token);
    client.exists(key, function(err, reply) {
        if (err) {
            cb(err, null);
        } else if (reply !== 1) {
            cb(new Error('token '+ token + ' is not exist, maybe expired.'), null);
        } else {
            client.hkeys(key, function(err, reply) {
                if (err) {
                    cb(err, null);
                } else {
                    var count = reply.length;
                    //ignore "createOn"
                    var delArr = [];
                    for (var i = 0; i < count; ++i) {
                        if (reply[i] !== 'create_on') {
                            delArr.push(reply[i]);
                        }
                    }
                    client.hdel(key, delArr);
                    client.expire(key, EXPIRE_TIME);
                    cb(null, true);
                }
            });    
        }
    });
};

exports.updateSession = function(token, obj, cb) {
    var key = keyWrapper(token);
    client.exists(key, function(err, reply) {
        if (err) {
            cb(err, null);
        } else if (reply !== 1) {
            cb(new Error('token '+ token + ' is not exist, maybe expired.'), null);
        } else {
            client.hmset(key, obj, function(err, reply) {
                if (err) {
                    cb(err, null);
                } else {
                    client.expire(key, EXPIRE_TIME);
                    cb(null, token);
                }        
            });            
        }
    });
};

exports.getSessionObject = function(token, cb) {
    //return token
    var key = keyWrapper(token);
    client.hgetall(key, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            client.expire(key, EXPIRE_TIME);
            cb(null, reply);
        }
    });
};

exports.getSessionAttrs = function(token, arr, cb) {
    var key = keyWrapper(token);
    client.hmget(key, arr, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            var attrObj = {};
            var count = arr.length;
            for (var i = 0; i < count; ++i) {
                attrObj[arr[i]] = reply[i];
            }
            client.expire(key, EXPIRE_TIME);
            cb(null, attrObj);
        }
    });
};

exports.verifyToken = function(token, cb) {
    var key = keyWrapper(token);
    client.exists(key, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            client.expire(key, EXPIRE_TIME);
            cb(null, (reply !== 1) ? false : true);
        }
    });
};
