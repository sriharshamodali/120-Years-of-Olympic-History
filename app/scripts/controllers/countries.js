'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the testApp
 */
app.controller('CountriesCtrl', ['$scope','olympicService','$rootScope', function ($scope, olympicService, $rootScope) {
  $rootScope.currentNavItem = 'Countries';

  $scope.selectedCountry = "";
  $scope.olympicCountries = [];
  $scope.years = [];
  $scope.participationCount_years = [];
  $scope.participationCount_values = [];
  $scope.successRate_years = [];
  $scope.successRate_values = [];
  $scope.winnerGenderRatio_years = [];
  $scope.winnerGenderRatio_values = [];
  $scope.showResult = false;

  olympicService.getData('countries/getcountries').then(
    function successCallback(response) {
        $scope.olympicCountries = response.data.data.nocList;
  },
  function errorCallback(response) {
    console.log("error- Countries List");
  }
);

  $scope.searchResult = function(selectedCountry)
  {
    olympicService.getData('countries/?country=' + selectedCountry).then(
      function successCallback(response) {

        $scope.winnerGenderRatio_years = response.data.data.winnerGenderRatio.years;
        $scope.winnerGenderRatio_values = response.data.data.winnerGenderRatio.values;
        $scope.participationCount_summer_years = response.data.data.participationCountSummer.years;
        $scope.participationCount_summer_values = response.data.data.participationCountSummer.values;
        $scope.participationCount_winter_years = response.data.data.participationCountWinter.years;
        $scope.participationCount_winter_values = response.data.data.participationCountWinter.values;
        $scope.successRate_years = response.data.data.successRate.years;
        $scope.successRate_values= response.data.data.successRate.values;
        
        Highcharts.chart('WinnerGenderRatio', {
          chart: {
              type: 'line',
              zoomType: 'x'
          },
          title: {
              text: 'Winner Gender Ratio Of '+ selectedCountry +' Over Years'
          },
          xAxis: {
              categories: $scope.winnerGenderRatio_years 
          },
          yAxis: {
              title: {
                  text: 'Winner Gender Ratio'
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
              name: 'Winner Gender Ratio',
              data: $scope.winnerGenderRatio_values
          }]
      });
        Highcharts.chart('ParticipationTrend_summer', {
          chart: {
              type: 'line',
              zoomType: 'x'
          },
          title: {
              text: 'Athletes Participation From '+ selectedCountry +' Over Years'
          },
          xAxis: {
              categories: $scope.participationCount_summer_years  
          },
          yAxis: {
              title: {
                  text: 'Number of Athletes'
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
              name: 'Number of Athletes',
              data: $scope.participationCount_summer_values
          }]
      });

      Highcharts.chart('ParticipationTrend_winter', {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: 'Athletes Participation From '+ selectedCountry +' Over Years'
        },
        xAxis: {
            categories: $scope.participationCount_winter_years  
        },
        yAxis: {
            title: {
                text: 'Number of Athletes'
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
            name: 'Number of Athletes',
            data: $scope.participationCount_winter_values
        }]
    });

      //Success Rate
      Highcharts.chart('SuccessRate', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Percentage Of Winners From '+ selectedCountry +' Over Years'
        },
        xAxis: {
            categories: $scope.successRate_years 
        },
        yAxis: {
            title: {
                text: 'Percentage Of Winners'
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
            name: 'Percentage Of Winners',
            data: $scope.successRate_values
        }]
    });
        
        $scope.showResult = true;
        console.log("success- Olympic country result");
    },
    function errorCallback(response) {
      console.log("error- Olympic country result");
    }
    );

    

  };

  $scope.reset = function()
  {
      $scope.selectedCountry = "";
      $scope.showResult = false;
  };

}]);
