'use strict';
app.controller('FilteredsearchCtrl',['$scope','olympicService','$window','$rootScope',function ($scope, olympicService,$window,$rootScope) {
    $rootScope.currentNavItem = 'FilteredSearch';
    $scope.olympicMedals = ['Gold', 'Silver', 'Bronze'];
    $scope.olympicYears_summer = [];
    $scope.olympicYears_winter = [];
    $scope.olympicYears = [];
    $scope.olympicSeasons = ['Summer','Winter'];
    $scope.olympicSports_summer = [];
    $scope.olympicSports_winter = [];
    $scope.olympicCities_summer = [];
    $scope.olympicCities_winter = [];
    $scope.olympicCategories = ['Men', 'Women'];
    $scope.olympicEvents = [];
    $scope.selectedCity = "";
    $scope.selectedCategory = "";
    $scope.selectedYear = "";
    $scope.selectedSeason = 'Summer';
    $scope.selectedSport = "";
    $scope.selectedEvent = "";
    $scope.selectedMedal = 'Gold';
    $scope.selectedGames = [];
    $scope.selectedYears = [];
    $scope.selectedSeasons = [];
    $scope.selectedSports = [];
    $scope.selectedAthletes = [];
    $scope.olympicEvents_sports_gender = [];
    $scope.tableResult = [];
    $scope.showResult = false;
    $scope.yearsbycity = false;

    olympicService.getData('sports/list/Summer').then(
      function successCallback(response) {
        $scope.olympicSports_summer= response.data.sports;
        console.log("success- Summer olympic sports");
    },
    function errorCallback(response) {
      console.log("error- Summer olympic sports");
    }
  );
  
  olympicService.getData('sports/list/Winter').then(
    function successCallback(response) {
      $scope.olympicSports_winter= response.data.sports;
      console.log("success- Winter olympic sports");
  },
  function errorCallback(response) {
    console.log("error- Winter olympic sports");
  }
  );

    olympicService.getData('lists/years/summer').then(
      function successCallback(response) {
        $scope.olympicYears_summer = response.data.data.years;
        console.log("success- Summer olympic years");
    },
    function errorCallback(response) {
      console.log("error- Summer olympic years");
    }
  );

  
  olympicService.getData('lists/years/winter').then(
    function successCallback(response) {
      $scope.olympicYears_winter = response.data.data.years;
      console.log("success- Winter olympic years");
  },
  function errorCallback(response) {
    console.log("error- Summer olympic years");
  }
  );

    $scope.get = function()
    {
      olympicService.getData('').then(
        function successCallback(response) {
          var result = response;
          console.log("success");
        },
        function errorCallback(response) {
          console.log("Error");
        }
      );
    };

    olympicService.getData('home/citiesbyseason/Summer').then(
      function successCallback(response) {
        $scope.olympicCities_summer = response.data.data.cities;
        console.log($scope.olympicCities_summer);
        console.log("success- citiesbyseason");
    },
    function errorCallback(response) {
      console.log("error- citiesbyseason");
    }
  );
  
  olympicService.getData('home/citiesbyseason/Winter').then(
    function successCallback(response) {
      $scope.olympicCities_winter = response.data.data.cities;
      console.log("success- Summer olympic years");
  },
  function errorCallback(response) {
    console.log("error- Summer olympic years");
  }
  );

    $scope.searchResult = function(selectedGame, selectedYear, selectedSeason, selectedSport, selectedAthlete,event)
    {
      console.log(selectedGame, selectedYear, selectedSeason, selectedSport, selectedAthlete);
      if(selectedGame == "" && selectedYear == "" && selectedSeason == "" && selectedSport == "" && selectedAthlete == "")
      {
        $window.alert('Please select atleast one filter.');
      }
      else
      {
        $scope.selectedGames = [];
        $scope.selectedYears = [];
        $scope.selectedSeasons = [];
        $scope.selectedSports = [];
        $scope.selectedAthletes = [];

        $scope.selectedGames.push(selectedGame);
        $scope.selectedYears.push(selectedYear);
        $scope.selectedSeasons.push(selectedSeason);
        $scope.selectedSports.push(selectedSport);
        $scope.selectedAthletes.push(selectedAthlete);

        $scope.tableResult.push({
          "Games": $scope.selectedGames,
          "Years": $scope.selectedYears,
          "Seasons": $scope.selectedSeasons,
          "Sports": $scope.selectedSports,
          "Athletes": $scope.selectedAthletes
        })
        $scope.showResult = true;
      }
    };

    $scope.reset = function()
    {
      $scope.showResult = false;
      $scope.selectedCity = "";
      $scope.selectedYear = "";
      $scope.selectedSeason = "";
      $scope.selectedSport = "";
      $scope.selectedMedal = "";
      $scope.selectedEvent = "";
      $scope.selectedCategory = "";
    };

    $scope.yearsByCity = function()
    {
      $scope.yearsbycity = true;
      var data = {'city': $scope.selectedCity};
      olympicService.postData('home/yearsbycity', data).then(
        function successCallback(response) {
          $scope.olympicYears = response.data.data.years;
        },
        function errorCallback(response) {
          console.log("error- olympic sports details");
        }
      );
    }

    $scope.eventsBySport = function(year)
    {
      $scope.selectedYear = year;
      if($scope.selectedSport == "" && $scope.selectedYear != "" && $scope.selectedCategory == "")
      {
        olympicService.getData('home/sportsbyyear/' + $scope.selectedYear).then(
          function successCallback(response) {
            $scope.olympicSports = response.data.data.sports;
            console.log("success- Summer olympic years");
        },
        function errorCallback(response) {
          console.log("error- Summer olympic years");
        }
        );
      }
      else if($scope.selectedSport != "" && $scope.selectedYear == "" && $scope.selectedCategory == "")
      {
        var data = {'sport': $scope.selectedSport};
      olympicService.postData('home/eventsbysport', data).then(
        function successCallback(response) {
          $scope.olympicEvents = response.data.data.events;
        },
        function errorCallback(response) {
          console.log("error- olympic sports details");
        }
      );
      }
      else if($scope.selectedSport != "" && $scope.selectedYear != "" && $scope.selectedCategory == "")
      {
        var data = {'sport': $scope.selectedSport, 'year': $scope.selectedYear};
        olympicService.postData('home/eventsbysportyear', data).then(
          function successCallback(response) {
            $scope.olympicEvents = response.data.data.events;
          },
          function errorCallback(response) {
            console.log("error- olympic sports details");
          }
        );
      }
      else if($scope.selectedSport != "" && $scope.selectedYear == "" && $scope.selectedCategory != "")
      {
        var selectedCategory = '';
        if($scope.selectedCategory == 'Men')
        {
          selectedCategory = 'M';
        }
        else
        {
          selectedCategory = 'F';
        }
        var data = {'sport': $scope.selectedSport, 'gender': selectedCategory};
        olympicService.postData('home/eventsbysportgender', data).then(
          function successCallback(response) {
            $scope.olympicEvents = response.data.data.events;
          },
          function errorCallback(response) {
            console.log("error- olympic sports details");
          }
        );
      }
      else{
        var data = {'sport': $scope.selectedSport, 'gender': selectedCategory, 'year': $scope.selectedYear};
        olympicService.postData('home/eventsbysportgenderyear', data).then(
          function successCallback(response) {
            $scope.olympicEvents = response.data.data.events;
          },
          function errorCallback(response) {
            console.log("error- olympic sports details");
          }
        );
      }
    }

  }]);
