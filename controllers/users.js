'use strict';
var users = require("../services/db").Users;


exports.signUp = function(token, userObj, cb) {
	users.createUser(userObj.userName, userObj.password, userObj, function(err, doc){
        var statusCode = 201;
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {uid: ''};
		} else {
            statusCode = 403;
			result.code = 'e1109';
			result.message = err;
            result.description = err.message;
            result.source = '<<webui>>';
        }
		cb(statusCode, result);
	});
};


exports.getUsers = function (token, obj, cb) {
    users.getUserList(obj.offset, obj.limit, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
              "total": obj.limit,  //总数
              "offset": obj.offset, //实际偏移量
              "count": doc.length,  //实际个数
              "users": []
            };
            for (var i = 0; i < doc.length; i++) {
                var user = {
                    id: doc[i].id,
                    user_name: doc[i].userName,
                    nick_name: doc[i].nickName,
                    enable:  doc[i].enabled
                };
                result.users.push(user);
            }
        } else {
            statusCode = 500;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<manager admin>>';
        }
        cb(statusCode, result);
    });
};



exports.createUser = function(token, userObj, cb) {
    users.getUserList(userObj.offset, userObj.limit, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
              "total": userObj.limit,  //总数
              "offset": userObj.offset, //实际偏移量
              "count": doc.length,  //实际个数
              "users": []
            };
            for (var i = 0; i < doc.length; i++) {
                var user = {
                    id: doc[i].id,
                    user_name: doc[i].userName,
                    nick_name: doc[i].nickName,
                    enable:  doc[i].enabled
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

exports.getUserInfo = function (token, userId, cb) {
    users.getUserInfo(userId, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
                id: doc.id,
                user_name: doc.userName,
                nick_name: doc.nickName,
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