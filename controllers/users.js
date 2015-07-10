'use strict';
var users = require("../services/db").Users;

exports.getUsers = function (token, obj, cb) {
    users.getUserList(obj.offset, obj.limit, function (err, docs) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
              "total":  obj.limit,  //总数
              "offset": obj.offset, //实际偏移量
              "count":  docs.length,  //实际个数
              "users":  []
            };
            for (var i = 0; i < doc.length; i++) {
                var user = {
                    id:        docs[i].id,
                    user_name: docs[i].user_name,
                    nick_name: docs[i].nick_name,
                    enable:    docs[i].enabled
                };
                result.users.push(user);
            }
        } else {
            statusCode = 500;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};



exports.createUser = function(token, userObj, cb) {
    users.createUser(userObj.userName, userObj.password, userObj, function (err, doc) {
        var result = {};
        var statusCode = 201;
        if (!err) {
            result = {user_id: doc.id};
        } else {
            statusCode = 403;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.getUserInfo = function (token, userId, cb) {
    users.getUserInfo (userId, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
                id: doc.id,
                user_name: doc.user_name,
                nick_name: doc.nick_name,
                enable:  doc.enabled
            };
        } else {
            statusCode = 500;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};


exports.updateUser = function (token, userId, userObj, cb) {
    users.updateUser(userId, userObj, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = doc;
        } else {
            statusCode = 500;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};