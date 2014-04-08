'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope','$interval', function ($scope,$interval) {
        $scope.birdPosition = {top: 150, left: 550};
        var screenHeight = window.innerHeight;
	
	$scope.birdVelocity = 0;
	$scope.birdAccerlator = 0.3;
        $scope.setPosition = function(){

            $scope.birdVelocity += $scope.birdAccerlator;
            $scope.birdPosition = {top: $scope.birdPosition.top + $scope.birdVelocity, left:550};
            if($scope.birdPosition.top > screenHeight)
            {
                //alert('you die');
                $scope.birdPosition = {top: 150, left: 550};
                $scope.birdVelocity = 0; 
            }
        };

        $scope.start = function(){
            $interval($scope.setPosition, 15);
        };
  }]);
