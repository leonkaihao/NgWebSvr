'use strict';
var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

router.post('/', function(req, res){
	var token = req.query.token;
	var bdObj = req.body.data;
	var sendObj = {};
	if (bdObj.type === 'createAdmin') {
		sendObj.userName = bdObj.name;
		sendObj.nickName = bdObj.name;
		sendObj.password = bdObj.pwd;
		sendObj.roles = [{type: 'mgr'}];
		users.signUp(token, sendObj, function(code, result){
			res.status(code).json(result);
		});
	}
});

module.exports = router;