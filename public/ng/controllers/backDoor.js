'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:BackDoorCtrl
 * @description
 * # BackDoorCtrl
 * Controller of the myApp
 */
angular.module('myApp').controller('BackDoorCtrl', ['$location', '$rootScope', 'BackDoorService', function ($location, $rootScope, BackDoorService) {
    var args = $location.search();
    BackDoorService.command($rootScope.token, args, function (data) {
        console.log(data);
        alert('Call backDoor successfully!');
    }, function (err) {
        alert(err.message);
    });
}]);
