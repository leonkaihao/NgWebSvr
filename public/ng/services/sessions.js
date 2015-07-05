'use strict';

/**
 * @ngdoc function
 * @name myApp.service:SessionsService
 * @description
 * # SessionsService
 * Service of the myApp
 */
angular.module('myApp').factory('SessionsService', ['$rootScope', 'ErrService', 'ApiService', function ($rootScope, ErrService, ApiService) {
    var cfgData = {};

    cfgData.createSession = function(successcb, failcb) {
        ApiService.post('/api/sessions', {}, function (data){
            $rootScope.session.token = data.token;
            if (typeof(Storage) !== 'undefined') {
                sessionStorage.token = data.token;
            }
            successcb(data);
        }, failcb);
    };

    cfgData.initSession = function (successcb, failcb) {
        $rootScope.session = {
            logged: false,
            token: ''
        };

        if (typeof(Storage) !== 'undefined') {
            // Yes! localStorage and sessionStorage support!
            //is page session already has a token?
            if (sessionStorage.token) {
                //Yes!
                $rootScope.session.token = sessionStorage.token;
                //is token valid?
                cfgData.verifyToken($rootScope.session.token, function (data) {
                    //yes! 
                    //And is user has logged?
                    cfgData.getSessionUser($rootScope.session.token, function (data) {
                        //yes! so reserve user basic info in $rootScope
                        $rootScope.session.logged = true;
                        $rootScope.session.userName = data.user_name; 
                        $rootScope.session.nickName = data.nick_name; //for display
                        $rootScope.session.userId = data.user_id;

                        successcb(data);
                    }, function (err){
                        //No
                        //that's OK, user need login
                        failcb(ErrService.getErr('11001'));
                    });
                }, function (err){
                    //No
                    //token should be generated again
                    sessionStorage.token = $rootScope.session.token = '';
                    cfgData.createSession(function (data) {
                        //successfully generated
                        sessionStorage.token = $rootScope.session.token = data.token;
                        successcb(data);
                    }, failcb);                    
                });
            } else {
                cfgData.createSession(function (data) {
                    sessionStorage.token = $rootScope.session.token = data.token;
                    successcb(data);
                }, failcb);
            }
        } else {
            // Sorry! No web storage support..
            // token only save in $rootScope
            cfgData.createSession(successcb, failcb);
        }
    };

    cfgData.createSessionUser = function (token, userName, password, securityCode, successcb, failcb) {
    	var obj = {
            params: {
              token: token
            },
            data:{
                user_name: userName,
                password: password,
                security_code: securityCode
            }
    	};
        ApiService.post('/api/sessions/user', obj, function (data) {
            $rootScope.session.logged = true;
            $rootScope.session.userName = data.user_name; 
            $rootScope.session.nickName = data.nick_name; //for display
            $rootScope.session.userId = data.user_id;
            successcb(data);
        }, failcb);
    };

    cfgData.deleteSessionUser = function(token, successcb, failcb) {
    	var obj = {
            params : {
        		token: token
            }
    	};
        //whatever successful or not, clear session's user info
        ApiService.delete('/api/sessions/user', function (data) {
            delete $rootScope.session.userName; 
            delete $rootScope.session.nickName;
            delete $rootScope.session.userId;
            $rootScope.session.logged = false;
            successcb(data);
        }, function (err) {
            delete $rootScope.session.userName; 
            delete $rootScope.session.nickName;
            delete $rootScope.session.userId;
            $rootScope.session.logged = false;
            failcb(err);
        });
    };


    cfgData.getSessionUser = function(token, successcb, failcb) {
        var obj = {
            params : {
                token: token
            }
        };
        ApiService.get('/api/sessions/user', obj, successcb, failcb);
    };

    cfgData.verifyToken = function(token, successcb, failcb) {
        var obj = {
            params : {
                token: token
            }
        };
        ApiService.head('/api/sessions', obj, successcb, failcb);
    };

    return cfgData;
}]);