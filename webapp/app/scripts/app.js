'use strict';

/**
 * @ngdoc overview
 * @name musicApp
 * @description
 * # musicApp
 *
 * Main module of the application.
 */
angular
  .module('musicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/summary', {
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl',
        controllerAs: 'summary'
      })
      .when('/matrix', {
        templateUrl: 'views/matrix.html',
        controller: 'MatrixCtrl',
        controllerAs: 'matrix'
      })
      .when('/mds', {
        templateUrl: 'views/mds.html',
        controller: 'MdsCtrl',
        controllerAs: 'mds'
      })
      .when('/mdspr', {
        templateUrl: 'views/mdspr.html',
        controller: 'MdsprCtrl',
        controllerAs: 'mdspr'
      })
      .when('/sub', {
        templateUrl: 'views/sub.html',
        controller: 'SubCtrl',
        controllerAs: 'sub'
      })
      .when('/roll', {
        templateUrl: 'views/roll.html',
        controller: 'RollCtrl',
        controllerAs: 'roll'
      })
      .when('/mdspattern', {
        templateUrl: 'views/mdspattern.html',
        controller: 'MdspatternCtrl',
        controllerAs: 'mdspattern'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
