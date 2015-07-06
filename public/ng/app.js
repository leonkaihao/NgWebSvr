/*
 * angular.js file
 */
'use strict';
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngResource', 'ngAnimate', 'ngRoute', 'ngTouch', 'cgBusy', 'ngMaterial']);
myApp.config([
    '$routeProvider', 
    '$locationProvider',
    '$resourceProvider',
    function($routeProvider, $locationProvider, $resourceProvider) {
        $routeProvider.when('/404', { templateUrl: ('partial/404'), controller: 'MyCtrl2' });
        $routeProvider.when('/home', { templateUrl: ('partial/home'), controller: 'MyCtrl2' });
        $routeProvider.otherwise({ redirectTo: '/404' });
        $locationProvider.html5Mode(true);
        
        $resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
    }
]);
  
myApp.run(['$location', 'SessionsService', function ($location, SessionsService) {
    SessionsService.initSession(function(data){
        $location.path('/home');
    }, function(err){
        if (err.name == 'NeedSignIn') {
            $location.path('/login');
        } else {
            alert(err.message);
        }
    });
}]);
