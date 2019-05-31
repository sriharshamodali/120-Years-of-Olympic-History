'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:OlympicgamesCtrl
 * @description
 * # OlympicgamesCtrl
 * Controller of the testApp
 */
app.controller('OlympicgamesCtrl', ['$scope','olympicService','$rootScope', function ($scope, olympicService, $rootScope) {
  $rootScope.currentNavItem = 'OlympicGames';

  $scope.searchEnable = false;
  $scope.olympicGameSeasons = ['Summer', 'Winter'];
  $scope.olympicGameGenders = ['Male', 'Female'];
  $scope.olympicGameYears_summer = [];
  $scope.olympicGameYears_winter = [];
  $scope.selectedSeason = "";
  $scope.selectedYear = "";
  $scope.hostCity = "";
  $scope.selectedGender = "";
  $scope.topAthletes = [];
  $scope.tableResult = [];
  $scope.showResult = false;

  olympicService.getData('lists/years/summer').then(
    function successCallback(response) {
      $scope.olympicGameYears_summer = response.data.data.years;
      console.log("success- Summer olympic years");
  },
  function errorCallback(response) {
    console.log("error- Summer olympic years");
  }
);

olympicService.getData('lists/years/winter').then(
  function successCallback(response) {
    $scope.olympicGameYears_winter = response.data.data.years;
    console.log("success- Winter olympic years");
},
function errorCallback(response) {
  console.log("error- Summer olympic years");
}
);

  $scope.searchResult = function(selectedSeason, selectedYear)
  {
    var selectedGender = '';
    $scope.selectedGender == 'Male' ? selectedGender = 'M' : selectedGender = 'F';
    olympicService.getData('games/' + selectedYear + '/' + selectedSeason.toLowerCase() + '/' + selectedGender).then(
      function successCallback(response) {
        $scope.hostCity = response.data.data.hostCity;
        $scope.topAthletes = response.data.data.topAthletes;

        angular.forEach($scope.topAthletes, function(topAthlete, key){
          $scope.tableResult.push({
            "athleteName": topAthlete.athlName,
            "medalCount": topAthlete.medalCount,
            "country": topAthlete.country
          });
        });
        
        $scope.showResult = true;
        console.log("success- Olympic game result");
    },
    function errorCallback(response) {
      console.log("error- Olympic game result");
    }
    );

  };

  $scope.reset = function()
  {
      $scope.selectedSeason = "";
      $scope.selectedYear = "";
      $scope.selectedGender = "";
      $scope.showResult = false;
      $scope.tableResult = [];
  };

  
}]);
