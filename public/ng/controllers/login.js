'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myApp
 */
angular.module('myApp').controller(
'LoginCtrl', 
['$scope', '$location', '$rootScope', 'UsersService', 'SessionsService', 
function ($scope, $location, $rootScope, UsersService, SessionsService) {
	$scope.loginData = {
		userName: '',
		password: '',
		securityCode: ''
	};
    $scope.login = function () {
    	SessionsService.createSessionUser(
    	$rootScope.session.token, 
    	$scope.loginData.userName, 
    	$scope.loginData.password, 
    	$scope.loginData.securityCode, 
    	function (data) {
    		$scope.loginData = {
				userName: '',
				password: '',
				securityCode: ''
			};
    		$location.path('/home');
    	}, function (err) {
    		alert(err.message);
    	});
    };
}]);