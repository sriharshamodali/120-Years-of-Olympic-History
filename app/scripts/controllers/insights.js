'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:InsightsCtrl
 * @description
 * # InsightsCtrl
 * Controller of the testApp
 */
app.controller('InsightsCtrl',['$scope','olympicService','$rootScope', function ($scope, olympicService,$rootScope) {

  $scope.TopSports_summer = [];
  $scope.TopSportsCounts_summer = [];
  $scope.TopSports_winter = [];
  $scope.TopSportsCounts_winter = [];

  $scope.GenderRatio_summer = [];
  $scope.GenderRatioCounts_summer = [];
  $scope.GenderRatio_winter = [];
  $scope.GenderRatioCounts_winter = [];

  $scope.GenderPart_summer = [];
  $scope.GenderPart_winter = [];
  $scope.GenderPart_Men_Summer = [];
  $scope.GenderPart_Men_Winter = [];
  $scope.GenderPart_Women_Summer = [];
  $scope.GenderPart_Women_Winter = [];

  $scope.GrowthPercentageYear_summer = [];
  $scope.GrowthPercentageYear_winter = [];
  $scope.GrowthPercentage_summer = [];
  $scope.GrowthPercentage_winter = [];

  $scope.NumberChangeYear_summer = [];
  $scope.NumberChangeYear_winter = [];
  $scope.NumberChange_summer = [];
  $scope.NumberChange_winter = [];

  $scope.BestSexRatio_countries = [];
  $scope.BestSexRatio = [];

  $scope.NationsPartChangeYears_summer = [];
  $scope.NationsPartChangeYears_winter = [];
  $scope.NationsPartChangeCount_summer = [];
  $scope.NationsPartChangeCount_winter = [];

  $scope.MeanAgeYears_summer = [];
  $scope.MeanAgeYears_winter = [];
  $scope.MeanAgeMedalCount_summer = [];
  $scope.MeanAgeMedalCount_winter = [];

  $scope.MedalCountCountries_summer = [];
  $scope.MedalCountCountries_winner = [];
  $scope.MedalCountGold_summer = [];
  $scope.MedalCountGold_winter = [];
  $scope.MedalCountSilver_summer = [];
  $scope.MedalCountSilver_winter = [];
  $scope.MedalCountBronze_summer = [];
  $scope.MedalCountBronze_winter = [];

  $scope.TopMedalWinners_male = [];
  $scope.TopMedalWinners_female = [];
  $scope.TopMedalWinnersCount_male = [];
  $scope.TopMedalWinnersCount_female = [];

  $scope.gymWeight_years = [];
  $scope.gymWeight_winnerWeights = [];
  $scope.gymWeight_loserWeight = [];

  $rootScope.currentNavItem = 'Insights';


  olympicService.getData('otherinsights/bballheight').then(
    function successCallback(response) {
        $scope.bballheight_years = response.data.data.years;
        $scope.bballheight_winnerWeights = response.data.data.winnerAvgWeights;
        $scope.bballheight_loserWeight = response.data.data.loserAvgWeight;

        Highcharts.chart('bballheight', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Winner and Loser Average Weight Trend in Basketball'
            },
            xAxis: {
                categories: $scope.bballheight_years
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Number of Athletes'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Winner Average Weight',
                data: $scope.bballheight_winnerWeights
            }, {
                name: 'Loser Average Weight',
                data: $scope.bballheight_loserWeight 
            }]
        });

        console.log("success for Gender part winter");
    },
    function errorCallback(response) {
      console.log("Error for Gender part winter");
    }
  );


  olympicService.getData('otherinsights/seniorwinners').then(
    function successCallback(response) {
        $scope.seniorwinners_sports = response.data.data.sport;
        $scope.seniorwinners_count = response.data.data.coordinatesArray;

        Highcharts.chart('seniorwinners', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
        
        
            title: {
                text: 'Medal Winners Over 50 Years Age'
            },
        
            xAxis: {
                categories: $scope.seniorwinners_sports
            },
        
            yAxis: {
                categories: ['Gold', 'Silver', 'Bronze'],
                title: null
            },
        
            colorAxis: {
                min: 3,
                minColor: '#FFFFFF',
                maxColor: '#FF576D'
            },
            credits: {
                enabled: false
            },
        
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
        
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br>Medal Winners <b>' +
                        this.point.value + '</b><br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            },
        
            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: $scope.seniorwinners_count,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        
        });
    },
    function errorCallback(response) {
      console.log("Error for Mean Age of Athlete Winners Summer");
    }
  );

  olympicService.getData('otherinsights/gymnweight').then(
    function successCallback(response) {
        $scope.gymWeight_years = response.data.data.years;
        $scope.gymWeight_winnerWeights = response.data.data.winnerWeights;
        $scope.gymWeight_loserWeight = response.data.data.loserWeight;

        Highcharts.chart('gymWeight', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Winner and Loser Weight Trend in Gymnastics'
            },
            xAxis: {
                categories: $scope.gymWeight_years
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Number of Athletes'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Winner Weight',
                data: $scope.gymWeight_winnerWeights
            }, {
                name: 'Loser Weight',
                data: $scope.gymWeight_loserWeight 
            }]
        });

        console.log("success for Gender part winter");
    },
    function errorCallback(response) {
      console.log("Error for Gender part winter");
    }
  );

  olympicService.getData('otherinsights/favsportbycountry').then(
    function successCallback(response) {
      $scope.favSports_sports = response.data.data.sportName;
      $scope.favSports_countryCount = response.data.data.countryCount;

      Highcharts.chart('favsports', {
        chart: {
            type: 'column'
            
        },
        title: {
            text: 'Most Competetive Sports By Countries'
        },
        xAxis: {
            categories: $scope.favSports_sports,
            title: {
                text: 'Sport'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Countries Count'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Countries Count',
            data: $scope.favSports_countryCount
        }]
    });
      console.log("success");
    },
    function errorCallback(response) {
      console.log("Error");
    }
  );

  //Top 10 Summer Sports 
  olympicService.getData('eventscount/summer').then(
    function successCallback(response) {
      $scope.TopSports_summer = response.data.data.sports;
      $scope.TopSportsCounts_summer = response.data.data.eventsCount;

      Highcharts.chart('TopSportsCounts_summer', {
        chart: {
            type: 'bar'
            
        },
        title: {
            text: 'Most Popular Sports'
        },
        xAxis: {
            categories: $scope.TopSports_summer,
            title: {
                text: 'Sport'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Count',
            data: $scope.TopSportsCounts_summer
        }]
    });
      console.log("success");
    },
    function errorCallback(response) {
      console.log("Error");
    }
  );

  //Top 10 winter Sports 
  olympicService.getData('eventscount/winter').then(
    function successCallback(response) {
      $scope.TopSports_winter = response.data.data.sports;
      $scope.TopSportsCounts_winter = response.data.data.eventsCount;

      Highcharts.chart('TopSportsCounts_winter', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Most Popular Sports'
        },
        xAxis: {
            categories: $scope.TopSports_winter,
            title: {
                text: 'Sport'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Count',
            data: $scope.TopSportsCounts_winter
        }]
    });
      console.log("success");
    },
    function errorCallback(response) {
      console.log("Error");
    }
  );
    

  //GenderRatio summer
  olympicService.getData('genderratio/summer').then(
    function successCallback(response) {
        $scope.GenderRatioCounts_summer = response.data.data.ratios;
        Highcharts.chart('GenderRatio_summer', {

            title: {
                text: 'Gender Ratio Over Olympic Years'
            },
        
            yAxis: {
                title: {
                    text: 'Gender Ratio'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom'
            },
            credits: {
              enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 1900,
                    pointInterval: 4
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Gender Ratio',
                data: $scope.GenderRatioCounts_summer.reverse()
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 5
                    },
                    chartOptions: {
                        legend: {
                            layout: 'vertical',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
        console.log("success for Gener Ratio summer");
    },
    function errorCallback(response) {
      console.log("Error for Gener Ratio summer");
    }
  );

  //GenderRatio winter
  olympicService.getData('genderratio/winter').then(
    function successCallback(response) {
        $scope.GenderRatioCounts_winter = response.data.data.ratios;
        Highcharts.chart('GenderRatio_winter', {

            title: {
                text: 'Gender Ratio Over Olympic Years'
            },
        
            yAxis: {
                title: {
                    text: 'Gender Ratio'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom'
            },
            credits: {
              enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 1924,
                    pointInterval: 4
                }
            },
        
            series: [{
                name: 'Gender Ratio',
                data: $scope.GenderRatioCounts_winter.reverse()
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 10
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
        console.log("success for Gener Ratio winter");
    },
    function errorCallback(response) {
      console.log("Error for Gener Ratio winter");
    }
  );

  //Gender Participation Summer
  olympicService.getData('genderpart/summer').then(
    function successCallback(response) {
        $scope.GenderPart_summer = response.data.data.year;
        $scope.GenderPart_Men_Summer = response.data.data.menCount;
        $scope.GenderPart_Women_Summer = response.data.data.womenCount;

        Highcharts.chart('GenderPart_summer', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gender Participation Over Olympic Years'
            },
            xAxis: {
                categories: $scope.GenderPart_summer.reverse()
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Number of Athletes'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Difference: ' + `${console.log(this)}`;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Men',
                data: $scope.GenderPart_Men_Summer.reverse()
            }, {
                name: 'Women',
                data: $scope.GenderPart_Women_Summer.reverse()
            }]
        });

        console.log("success for Gender part summer");
    },
    function errorCallback(response) {
      console.log("Error for Gender part summer");
    }
  );
  
  //Gender Participation winter
  olympicService.getData('genderpart/winter').then(
    function successCallback(response) {
        $scope.GenderPart_winter = response.data.data.year;
        $scope.GenderPart_Men_Winter = response.data.data.menCount;
        $scope.GenderPart_Women_Winter = response.data.data.womenCount;

        Highcharts.chart('GenderPart_winter', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gender Participation Over Olympic Years'
            },
            xAxis: {
                categories: $scope.GenderPart_winter.reverse()
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Number of Athletes'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Men',
                data: $scope.GenderPart_Men_Winter.reverse()
            }, {
                name: 'Women',
                data: $scope.GenderPart_Women_Winter.reverse()
            }]
        });

        console.log("success for Gender part winter");
    },
    function errorCallback(response) {
      console.log("Error for Gender part winter");
    }
  );


  //Atheletic Growth Percentage Summer
  olympicService.getData('athlgrowthperc/summer').then(
    function successCallback(response) {
        $scope.GrowthPercentageYear_summer = response.data.data.year;
        $scope.GrowthPercentage_summer = response.data.data.percentage;

        Highcharts.chart('GrowthPercentage_summer', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Growth of Athlete Participation'
            },
            xAxis: {
                categories: $scope.GrowthPercentageYear_summer.reverse()
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Growth Percentage',
                data: $scope.GrowthPercentage_summer.reverse()
            }]
        });

    },
    function errorCallback(response) {
      console.log("Error for Atheletic Growth Percentage Summer");
    }
  );

  //Atheletic Growth Percentage Winter
  olympicService.getData('athlgrowthperc/winter').then(
    function successCallback(response) {
        $scope.GrowthPercentageYear_winter = response.data.data.year;
        $scope.GrowthPercentage_winter = response.data.data.percentage;

        Highcharts.chart('GrowthPercentage_winter', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Growth of Athlete Participation'
            },
            xAxis: {
                categories: $scope.GrowthPercentageYear_winter.reverse()
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Growth Percentage',
                data: $scope.GrowthPercentage_winter.reverse()
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Atheletic Growth Percentage Winter");
    }
  );

  //Athlete Number Change Summer
  olympicService.getData('athlnumchange/summer').then(
    function successCallback(response) {
        $scope.NumberChangeYear_summer = response.data.data.year;
        $scope.NumberChange_summer = response.data.data.count;

        Highcharts.chart('NumberChange_summer', {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Athletes in Each Olympic Game'
            },
            xAxis: {
                categories: $scope.NumberChangeYear_summer.reverse()
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
                data: $scope.NumberChange_summer.reverse()
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Athlete Number Change Summer");
    }
  );
  
  //Athlete Number Change Winter
  olympicService.getData('athlnumchange/winter').then(
    function successCallback(response) {
        $scope.NumberChangeYear_winter = response.data.data.year;
        $scope.NumberChange_winter = response.data.data.count;

        Highcharts.chart('NumberChange_winter', {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Athletes in Each Olympic Game'
            },
            xAxis: {
                categories: $scope.NumberChangeYear_winter.reverse()
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
                data: $scope.NumberChange_winter.reverse()
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Athlete Number Change Winter");
    }
  );

  // Top 10 sex ratio
  olympicService.getData('otherinsights/bestsexratio').then(
    function successCallback(response) {
        $scope.BestSexRatio_countries = response.data.data.country;
        $scope.BestSexRatio = response.data.data.ratio;
        $scope.BestSexRatioData = [];
        var i;
        for(i = 0; i < $scope.BestSexRatio_countries.length; i++)
        {
            $scope.BestSexRatioData.push([$scope.BestSexRatio_countries[i], $scope.BestSexRatio[i]]);
        }

        Highcharts.chart('BestSexRatio', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Countries With Best Sex Ratio'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Sex Ratio'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Sex Ratio: <b>{point.y:.1f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Population',
                data: $scope.BestSexRatioData,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Top 10 sex ratio");
    }
  );

  // Nations Participation Change Summer
  olympicService.getData('otherinsights/nationparticcntchange/summer').then(
    function successCallback(response) {
        $scope.NationsPartChangeYears_summer = response.data.data.year;
        $scope.NationsPartChangeCount_summer = response.data.data.count;

        Highcharts.chart('NationsParticipation_summer', {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Nations Participation in Olympic Games'
            },
            xAxis: {
                categories: $scope.NationsPartChangeYears_summer
            },
            yAxis: {
                title: {
                    text: 'Nations Participated'
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
                name: 'Nations Participated',
                data: $scope.NationsPartChangeCount_summer
            }]
        }); 
 


    },
    function errorCallback(response) {
      console.log("Error for Top 10 sex ratioNations Participation Change Summer");
    }
  );

  // Nations Participation Change Winter
  olympicService.getData('otherinsights/nationparticcntchange/winter').then(
    function successCallback(response) {
        $scope.NationsPartChangeYears_winter = response.data.data.year;
        $scope.NationsPartChangeCount_winter = response.data.data.count;

        Highcharts.chart('NationsParticipation_winter', {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Nations Participation in Olympic Games'
            },
            xAxis: {
                categories: $scope.NationsPartChangeYears_winter
            },
            yAxis: {
                title: {
                    text: 'Nations Participated'
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
                name: 'Nations Participated',
                data: $scope.NationsPartChangeCount_winter
            }]
        }); 
    },
    function errorCallback(response) {
      console.log("Error for Top 10 sex ratioNations Participation Change Winter");
    }
  );

  //Mean Age of Athlete Winners Summer
  olympicService.getData('avgage/winners/summer').then(
    function successCallback(response) {
        $scope.MeanAgeYears_summer = response.data.data.year;
        $scope.MeanAgeMedalCount_summer = response.data.data.coordinatesArray;

        Highcharts.chart('MeanAge_summer', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
        
        
            title: {
                text: 'Mean Age of Medal Winners in Olympic Games'
            },
        
            xAxis: {
                categories: $scope.MeanAgeYears_summer
            },
        
            yAxis: {
                categories: ['Gold', 'Silver', 'Bronze'],
                title: null
            },
        
            colorAxis: {
                min: 24,
                minColor: '#FFFFFF',
                maxColor: '#FF576D'
            },
            credits: {
                enabled: false
            },
        
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
        
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br>Mean Age <b>' +
                        this.point.value + '</b><br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            },
        
            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: $scope.MeanAgeMedalCount_summer,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        
        });
    },
    function errorCallback(response) {
      console.log("Error for Mean Age of Athlete Winners Summer");
    }
  );

  //Mean Age of Athlete Winners Winter
  olympicService.getData('avgage/winners/winter').then(
    function successCallback(response) {
        $scope.MeanAgeYears_winter = response.data.data.year;
        $scope.MeanAgeMedalCount_winter = response.data.data.coordinatesArray;

        Highcharts.chart('MeanAge_winter', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
        
        
            title: {
                text: 'Mean Age of Medal Winners in Olympic Games'
            },
        
            xAxis: {
                categories: $scope.MeanAgeYears_winter
            },
        
            yAxis: {
                categories: ['Bronze', 'Silver', 'Gold'],
                title: null
            },
        
            colorAxis: {
                min: 24,
                minColor: '#FFFFFF',
                maxColor: '#FF576D'
            },
        
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            credits: {
                enabled: false
            },
        
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            },
        
            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: $scope.MeanAgeMedalCount_winter,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        
        });
    },
    function errorCallback(response) {
      console.log("Error for Mean Age of Athlete Winners Winter");
    }
  );

  // Top 10 countries medal count summer
  olympicService.getData('countrytally/summer').then(
    function successCallback(response) {
        $scope.MedalCountCountries_summer = response.data.data.country;
        $scope.MedalCountGold_summer = response.data.data.gold;
        $scope.MedalCountSilver_summer = response.data.data.silver;
        $scope.MedalCountBronze_summer = response.data.data.bronze;

        Highcharts.chart('TopMedalCount_summer', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Countries With Highest Medal Count'
            },
            xAxis: {
                categories: $scope.MedalCountCountries_summer
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Country'
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Gold',
                data: $scope.MedalCountGold_summer
            }, {
                name: 'Silver',
                data: $scope.MedalCountSilver_summer
            }, {
                name: 'Bronze',
                data: $scope.MedalCountBronze_summer
            }]
        });

    },
    function errorCallback(response) {
      console.log("Error for Top 10 countries medal count summer");
    }
  );

  // Top 10 countries medal count winter
  olympicService.getData('countrytally/winter').then(
    function successCallback(response) {
        $scope.MedalCountCountries_winter = response.data.data.country;
        $scope.MedalCountGold_winter = response.data.data.gold;
        $scope.MedalCountSilver_winter = response.data.data.silver;
        $scope.MedalCountBronze_winter = response.data.data.bronze;

        Highcharts.chart('TopMedalCount_winter', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Countries With Highest Medal Count'
            },
            xAxis: {
                categories: $scope.MedalCountCountries_winter
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Country'
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Gold',
                data: $scope.MedalCountGold_winter,
                color: '#ff0000'
            }, {
                name: 'Silver',
                data: $scope.MedalCountSilver_winter
            }, {
                name: 'Bronze',
                data: $scope.MedalCountBronze_winter
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Top 10 countries medal count winter");
    }
  );

  //Top 10 Medal Winners Male
  olympicService.getData('topmedalwinners/male').then(
    function successCallback(response) {
        $scope.TopMedalWinners_male = response.data.data.name;
        $scope.TopMedalWinnersCount_male = response.data.data.medalCount;

        $scope.TopMedalWinnersData_male = [];
        var i;
        for(i = 0; i < $scope.TopMedalWinners_male.length; i++)
        {
            $scope.TopMedalWinnersData_male.push([$scope.TopMedalWinners_male[i], $scope.TopMedalWinnersCount_male[i]]);
        }

        Highcharts.chart('TopMedalWinners_male', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Athletes With Highest Medal Count'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Medal Count'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Medal Count: <b>{point.y:.1f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Population',
                data: $scope.TopMedalWinnersData_male,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Top 10 Medal Winners Male");
    }
  );

  //Top 10 Medal Winners Female
  olympicService.getData('topmedalwinners/female').then(
    function successCallback(response) {
        $scope.TopMedalWinners_female = response.data.data.name;
        $scope.TopMedalWinnersCount_female = response.data.data.medalCount;

        $scope.TopMedalWinnersData_female = [];
        var i;
        for(i = 0; i < $scope.TopMedalWinners_female.length; i++)
        {
            $scope.TopMedalWinnersData_female.push([$scope.TopMedalWinners_female[i], $scope.TopMedalWinnersCount_female[i]]);
        }

        Highcharts.chart('TopMedalWinners_female', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Athletes With Highest Medal Count'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Medal Count'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Medal Count: <b>{point.y:.1f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Population',
                data: $scope.TopMedalWinnersData_female,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    },
    function errorCallback(response) {
      console.log("Error for Top 10 Medal Winners Male");
    }
  );


  


  }]);
