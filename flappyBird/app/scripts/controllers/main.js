'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.birdPosition = {top: 300, left: 550};

        $scope.setPosition = function(){
            $scope.birdPosition = {top: $scope.birdPosition.top +20, left:550};
        };

  }]);
