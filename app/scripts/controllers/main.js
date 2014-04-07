'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.birdPosition = {top: 150, left: 550};
        var screenHeight = window.innerHeight;

        $scope.setPosition = function(){
            $scope.birdPosition = {top: $scope.birdPosition.top + 3, left:550};
            if($scope.birdPosition.top > screenHeight)
            {
                alert('you die');
                $scope.birdPosition = {top: 150, left: 550};
                
            }
        };
  }]);
