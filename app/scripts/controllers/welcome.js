'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the testApp
 */
app.controller('WelcomeCtrl', ['$scope','olympicService','$rootScope', function ($scope, olympicService, $rootScope) {
    $rootScope.currentNavItem = 'welcome';
    $scope.openPage = "";
    $scope.goto = function(page) {
        $scope.currentNavItem = page;
      console.log("Goto " + page);
    };
    $scope.count = "";
    olympicService.getData('lists/dbrowcount').then(
      function successCallback(response) {
        $scope.count= response.data.data.queryCount;
        console.log("success- dbrowcount");
    },
    function errorCallback(response) {
      console.log("error- dbrowcount");
    }
  );
  }]);
