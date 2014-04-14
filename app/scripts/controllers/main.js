'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope','$interval', function ($scope,$interval) {
    $scope.birdPosition = {top: 150, left: 550};
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
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
        $scope.pipesBottom = [];
        for(var i=0; i<1; i++){
            $scope.pipes.push(createPipe(i));
            $scope.pipesBottom.push(createPipe(i));
        }
    }

    var createPipe = function(index){
        return {
            height: generatePipeHeight(100, 250),
            position: {
                top: 0,
                left: (screenWidth-700)/2+700+ (230+80)*index
            }
        }
    }

    var generatePipeHeight = function(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    $scope.setPipePosition = function(){
        for(var i=0; i<$scope.pipes.length; i++){
            var pipe = $scope.pipes[i];
            // pipe.position.left = pipe.position.left - 5;
            pipe.position.left = pipe.position.left - 5;

            if(i==$scope.pipes.length-1)
            {
                if((containerPosition.left+700-pipe.position.left) > 310){
                    $scope.pipes.push(createPipe(0));
                }
            }

            if(pipe.position.left+80 < containerPosition.left){
                $scope.pipes.shift();
            }
        }
    }
  }]);
