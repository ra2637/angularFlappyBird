'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope','$interval', function ($scope,$interval) {
    $scope.birdPosition = {top: 150, left: 550};
    var screenHeight = window.innerHeight;
    var containerPosition = angular.element(document.getElementsByClassName('gameContainer')).position();
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
        $interval(function(){
            $scope.setPosition();
            $scope.setPipePosition();
        }, 15);
    };

    $scope.initPipes = function(){
        $scope.pipes = [];
        for(var i=0; i<5; i++){
            $scope.pipes.push(createPipe(i));
        }
    }

    var createPipe = function(index){
        return {
            height: generatePipeHeight(100, 250),
            position: {
                top: 0,
                left: 1200 + 160*2*index
            }
        }
    }

    var generatePipeHeight = function(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    $scope.setPipePosition = function(){
        for(var i=0; i<$scope.pipes.length; i++){
            var pipe = $scope.pipes[i];
            pipe.position.left = pipe.position.left - 5;

            if(pipe.position.left+80 < containerPosition.left){
                $scope.pipes.shift();
                $scope.pipes.push(createPipe(3));
            }
        }
    }
  }]);
