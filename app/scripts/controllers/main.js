'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.birdPosition = {top: 150, left: 550};

        $scope.setPosition = function(){
            $scope.birdPosition = {top: $scope.birdPosition.top + 3, left:550};
            if($scope.birdPosition.top > 300)
            {
                $scope.birdPosition = {top: 150, left: 550};
            }
        };
  }]);
