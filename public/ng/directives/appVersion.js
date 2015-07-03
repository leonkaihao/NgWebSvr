'use strict';

/**
 * @ngdoc function
 * @name myApp.directive:appVersion
 * @description
 * # appVersion
 * Directive of the myApp
 */
angular.module('myApp').directive('appVersion', [ 'version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);
