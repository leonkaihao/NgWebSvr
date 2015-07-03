'use strict';

/**
 * @ngdoc function
 * @name myApp.service:UsersService
 * @description
 * # UsersService
 * Service of the myApp
 */
angular.module('myApp').factory('UsersService', ['ApiService', function (ApiService) {
    var cfgData = {};

    cfgData.queryUser = function (token, userName, successcb, failcb) {
        var obj = {
            params: {
                token: token,
                user_name: userName
            }
        };
        ApiService.head('/api/users', obj, successcb, failcb);
    };

    cfgData.createUser = function (token, userName, password, securityCode, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data: {
                user_name: userName,
                password: password,
                security_code: securityCode
            }
        };
        ApiService.post('/api/users', obj, successcb, failcb);
    };

    cfgData.updateUser = function (token, userId, attrsObj, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data: attrsObj
        };
        ApiService.put('/api/users/' + userId, obj, successcb, failcb);
    };

    cfgData.getUser = function (token, userId, successcb, failcb) {
        var obj = {
            params: {
                token: token
            }
        };
        ApiService.get('/api/users/' + userId, obj, successcb, failcb);
    };
    
    return cfgData;
}]);