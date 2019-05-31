'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AthletesCtrl
 * @description
 * # AthletesCtrl
 * Controller of the testApp
 */
app.controller('AthletesCtrl', ['$scope','olympicService','$rootScope', function ($scope, olympicService,$rootScope) {
  $rootScope.currentNavItem = 'Athletes';
  
  $scope.athlete = "";
  $scope.athletes = [];
  $scope.athleteID  = "";
  $scope.searchResult = [];
  $scope.showOptions = false;
  $scope.showResult = false;
  $scope.changeFunction = function() {
    olympicService.getData('athletes/search?name=' + $scope.athlete).then(
      function successCallback(response) {
        if($scope.athlete != "" && $scope.athlete.length > 2){
          $scope.athletes = response.data.data.athletes;
          $scope.showOptions  = true;
          
        }
        else{
          $scope.athletes = [];
          $scope.showOptions  = false;
        }
    },
    function errorCallback(response) {
      console.log("error- Athletes information");
    }
  );
  }

  $scope.setAthlete = function(name, id)
  {
    $scope.athlete = name;
    $scope.athleteID = id;
    $scope.showOptions  = false;
    // $scope.search(id);
  };
 
  $scope.search = function()
  {
    $scope.searchResult = [];
    olympicService.getData('athletes/getinfo/' + $scope.athleteID ).then(
      function successCallback(response) {

        angular.forEach(response.data.participationHistory, function(participationHistory, key){
          $scope.searchResult.push({
            "name": participationHistory.name,
            "country": participationHistory.country,
            "event": participationHistory.event,
            "game": participationHistory.game,
            "age": participationHistory.age,
            "weight": participationHistory.weight,
            "medal":participationHistory.medal
          });
        });

        $scope.showResult = true;
        
    },
    function errorCallback(response) {
      console.log("error- Athletes information");
    }
  );
  };



}]);
