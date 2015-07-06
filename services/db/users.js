'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var userObj = exports = module.exports = {};

var UserModel = model.UserModel;

userObj.init = function (ap) {
    userObj.app = ap;
    userObj.db = ap.DB;
};

/**
* Users operations
*/

userObj.verifyUser = function (userName, password, cb) {
	UserModel.findOne({
        'userName': userName, 
        'password': password
    }).select('id userName nickName').exec(function (err, user) {
		if (err) {
			cb(err, null);
        } else if (!user) {
			cb(new Error('Verify user failed'), null);
		} else {
            cb(null, user);
		}
    });
};

userObj.queryUser = function(userName, cb) {
    UserModel.findOne({
        'userName': userName
    }).select('id').exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.createUser = function (userName, password, userObj, cb) {
    var userInfo = {
        id: uuid.v4(),
        userName: userName,
        password: password,
        nickName: userName
    };
    if (userObj.nickName) {
        userInfo.nickName = userObj.nickName;
    }
    var newUser = new UserModel(userInfo);
    newUser.save ( function ( err, user ){
        if (err) {
            cb(err, null);
        } else {
            var result = {
                id: user.id
            };
            cb(null, result);
        }
    });
};

userObj.updateUser = function (userId, userObj, cb) {
    UserModel.findOne({
        'id': userId
    }, function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            for (key in userObj) {
                if (key === 'password') {
                    user.password = userObj.password;
                }
                if (key === 'nickName') {
                    user.nickName = userObj.nickName;
                }
                //todo: add other attrs here
                //...
                user.modifyOn = Date.now();
            }
            user.save(function (err, result) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, user);
                }
            });
        }
    });
};

userObj.getUserInfo = function (userId, cb) {
    var acId = userId;
    UserModel.findOne({id: acId})
    .select('id userName nickName createOn modifyOn enabled')
    .exec(function (err, user) {
        if (err) {
            cb(err, null)
        } else if (!user) {
            cb(new Error("Can not find user by user id " + acId), null);
        } else {
            cb(null, user);
        }
    });
};


/**
* get user list
*   
*/
userObj.getUserList = function (offset, limit, cb) {
    UserModel.find()
    .skip(offset)
    .limit(limit)
    .select('id userName nickName createOn modifyOn enabled')
    .exec(function(err, users) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, users);
        }
    });
};