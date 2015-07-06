var express = require('express');
var router = express.Router();
var sessions = require('../controllers/sessions.js');

/* create user session */
/* this happened when a client open site page*/
router.post('/', function(req, res){
	sessions.createSession(function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

router.head('/', function(req, res){
	var token = req.query.token;
	sessions.verifyToken(token, function (statusCode, result) {
		res.status(statusCode).end();
	});	
});

/*user login*/
router.post('/user', function(req, res){
	
	var token = req.query.token;
	var obj = {};
	obj.userName = req.body.data.user_name;
	obj.password = req.body.data.password;
	obj.securityCode = req.body.data.security_code;
    sessions.auth(token, obj, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

/* user log out */
router.delete('/user', function(req, res){
	var token = req.query.token;
	sessions.signOut(token, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

router.get('/user', function(req, res){
	var token = req.query.token;
	sessions.getUser(token, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

router.verify = function () {
	return function (req, res, next) {
		if (req.path == '/api/sessions' && req.method == 'POST') {
			next();
		} else {
			sessions.verifyToken (req.query.token, function (statusCode, result) {
				if (statusCode >= 400) {
					res.status(statusCode).json(result);
					return;
				} else {
					next();
				}
			});
		}
	};
}

module.exports = router;