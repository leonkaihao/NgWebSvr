/*
 * angular.js file
 */
'use strict';
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'ngTouch', 'cgBusy', 'ngMaterial']);
myApp.config([
    '$routeProvider', 
    '$locationProvider',
    '$resourceProvider',
    function($routeProvider, $locationProvider, $resourceProvider) {
        $routeProvider.when('/', { template: '', controller: '' });
        $routeProvider.when('/404', { templateUrl: ('partial/404'), controller: '' });
        $routeProvider.when('/home', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
        $routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });        
        $routeProvider.when('/backDoor', { controller: 'LoginCtrl' });
        $routeProvider.otherwise({ redirectTo: '/404' });
        $locationProvider.html5Mode(true);
        
        $resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
    }
]);
  
myApp.run(['$location', 'SessionsService', function ($location, SessionsService) {
    var path = $location.path();
    if (path !== '/') {
        $location.path('/');
    } else {
        path = '/home';
    }
    SessionsService.initSession(function(data){
        $location.path(path);
    }, function(err){
        if (err.name == 'NeedSignIn') {
            $location.path('/login');
        } else {
            alert(err.message);
        }
    });
}]);
