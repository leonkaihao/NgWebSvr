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
['$scope', '$location', '$rootScope', '$mdSidenav', 'UsersService', 'SessionsService', 
function ($scope, $location, $rootScope, $mdSidenav, UsersService, SessionsService) {
	$scope.toggleSidenav = function(menuId) {
    	$mdSidenav(menuId).toggle();
  	};
    $scope.logout = function () {
    	SessionsService.deleteSessionUser($rootScope.session.token, function (data) {
    		$location.path('/login');
    	}, function (err) {
    		$location.path('/login');
    	});
    };
}]);