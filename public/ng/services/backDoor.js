'use strict';

/**
 * @ngdoc function
 * @name myApp.service:BackDoorServices
 * @description
 * # BackDoorServices
 * Service of the myApp
 */
angular.module('myApp').factory('BackDoorService', ['ApiService', function (ApiService) {
    var cfgData = {};

    cfgData.command = function (token, args, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data: args
        };
        return ApiService.post('/api/backdoor', obj, successcb, failcb);
    };
    
    return cfgData;
}]);