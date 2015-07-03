'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the myApp
 */
angular.module('myApp').controller(
'IndexCtrl', 
['$scope', '$location', '$rootScope', 'UserService', 'SessionService', 
function ($scope, $location, $rootScope, UserService, SessionService) {
    $scope.logout = function () {
    	SessionService.deleteSessionUser($rootScope.session.token, function (data) {
    		$location.path('/login');
    	}, function (err) {
    		$location.path('/login');
    	});
    };
}]);