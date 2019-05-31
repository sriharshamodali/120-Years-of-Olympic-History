'use strict';

var app = angular
  .module('olymppicHistory', [
    'ngMaterial',
    'ngRoute',
    'md.data.table',
    'ngSanitize', 
    'ui.bootstrap'
  ]);

  app.run(function($rootScope) {
    $rootScope.currentNavItem = '';
  });

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome'
      })
      .when('/FilteredSearch', {
        templateUrl: 'views/filteredsearch.html',
        controller: 'FilteredsearchCtrl',
        controllerAs: 'FilteredSearch'
      })
      .when('/Athletes', {
        templateUrl: 'views/athletes.html',
        controller: 'AthletesCtrl',
        controllerAs: 'Athletes'
      })
      .when('/Countries', {
        templateUrl: 'views/countries.html',
        controller: 'CountriesCtrl',
        controllerAs: 'Countries'
      })
      .when('/Sports', {
        templateUrl: 'views/sports.html',
        controller: 'SportsCtrl',
        controllerAs: 'Sports'
      })
      .when('/Insights', {
        templateUrl: 'views/insights.html',
        controller: 'InsightsCtrl',
        controllerAs: 'Insights'
      })
      .when('/OlympicGames', {
        templateUrl: 'views/olympicgames.html',
        controller: 'OlympicgamesCtrl',
        controllerAs: 'OlympicGames'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  app.factory("olympicService",function($http){
    var service = {};
    service.getData = function(source){
       return $http.get("http://10.136.237.180:3000/" + source)
      //return $http.get("http://10.20.217.215:3000/" + source)
    };

    service.postData = function(source, data){
      return $http.post("http://10.136.237.180:3000/" + source, JSON.stringify(data), {'Content-Type': 'application/json'})
      //return $http.post("http://10.20.217.215:3000/" + source, JSON.stringify(data), {'Content-Type': 'application/json'})

      
    };
    return service;
  });
