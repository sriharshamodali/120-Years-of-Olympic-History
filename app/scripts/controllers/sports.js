'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:SportsCtrl
 * @description
 * # SportsCtrl
 * Controller of the testApp
 */
app.controller('SportsCtrl', ['$scope','olympicService','$rootScope', function ($scope, olympicService, $rootScope) {
  $rootScope.currentNavItem = 'Sports';

  $scope.showBackground = true;
  $scope.selectedSeason = 'Summer';
  $scope.selectedSport = "";
  $scope.olympicSports_summer = [];
  $scope.olympicSports_winter = [];
  $scope.countryParticipationTrend_years = [];
  $scope.countryParticipationTrend_countries = [];
  $scope.countryParticipationTrend_count = [];
  $scope.topAthletesByMedalCountMens = [];
  $scope.topAthletesByMedalCountWomen = [];
  $scope.mensEvents = [];
  $scope.womensEvents = [];
  $scope.athleteParticipationTrend_count = [];
  $scope.athleteParticipationTrend_years = [];
  $scope.popularityInEvents_years = [];
  $scope.popularityInEvents_percentage = [];
  $scope.olympicSeasons = ['Summer', 'Winter'];

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

$scope.searchResult = function(selectedSport)
{
  var data = {'sport': selectedSport};
  olympicService.postData('sports/getdetails', data).then(
    function successCallback(response) {
      $scope.countryParticipationTrend_years = response.data.data.cntryParticipationTrend.years;
      $scope.countryParticipationTrend_countries = response.data.data.cntryParticipationTrend.countries;
      $scope.countryParticipationTrend_count = response.data.data.cntryParticipationTrend.count;

      Highcharts.chart('Participation', {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: 'Participation Trend Of Countries Over Years'
        },
        xAxis: {
            categories: $scope.countryParticipationTrend_years  
        },
        yAxis: {
            title: {
                text: 'Participation Trend'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Participation Trend',
            data: $scope.countryParticipationTrend_count
        }]
    });

      angular.forEach(response.data.data.topAthletesByMedalCountMens, function(athlete, key){
        $scope.topAthletesByMedalCountMens.push({
         "name": athlete.name,
         "country": athlete.country,
         "medalCount": athlete.medalCount,
         "rank": athlete.rank
        });
      });

      angular.forEach(response.data.data.topAthletesByMedalCountWomens, function(athlete, key){
        $scope.topAthletesByMedalCountWomen.push({
         "name": athlete.name,
         "country": athlete.country,
         "medalCount": athlete.medalCount,
         "rank": athlete.rank
        });
      });

      $scope.mensEvents = response.data.data.mensEvents;
      $scope.womensEvents = response.data.data.womensEvents;

      $scope.athleteParticipationTrend_years = response.data.data.popularityTrend.year;
      $scope.athleteParticipationTrend_count = response.data.data.popularityTrend.count;
      Highcharts.chart('AthleteParticipation', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Athlete Participation In '+ selectedSport +' Over Years'
        },
        xAxis: {
            categories: $scope.athleteParticipationTrend_years 
        },
        yAxis: {
            title: {
                text: 'Athlete Participation'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Athlete Participation',
            data: $scope.athleteParticipationTrend_count
        }]
    });

      $scope.popularityInEvents_years = response.data.data.popularityInEvents.year;
      $scope.popularityInEvents_percentage = response.data.data.popularityInEvents.percentage;
      Highcharts.chart('popularityInEvents', {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: 'Popularity Percentage Of '+ selectedSport +' Over Years'
        },
        xAxis: {
            categories: $scope.popularityInEvents_years  
        },
        yAxis: {
            title: {
                text: 'Popularity Percentage'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Popularity Percentage',
            data: $scope.popularityInEvents_percentage
        }]
    });

      $scope.showBackground = false;
      console.log("success- olympic sports details");
  },
  function errorCallback(response) {
    console.log("error- olympic sports details");
  }
);
};

$scope.reset = function()
  {
      $scope.selectedSeason = "";
      $scope.selectedSport = "";
      $scope.showBackground = true;
      
  };





}]);
