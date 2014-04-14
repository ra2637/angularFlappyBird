'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope','$interval', '$document', function ($scope,$interval, $document) {
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    var containerPosition = angular.element(document.getElementsByClassName('gameContainer')).position();
    var gameStartInterval;
    var gameStatusArr = ['prepare', 'start', 'dead'];
    // $scope.gameStatus = gameStatusArr[0];
    $document.keyup(function(event){
      if(event.which === 32){
        if ($scope.gameStatus === gameStatusArr[0]) {
            $scope.gameStatus = gameStatusArr[1];
            $scope.start();
        }else if($scope.gameStatus === gameStatusArr[2]){
            $scope.init();
            $scope.$digest();
        }
      }
    });

    $scope.setPosition = function(){
        $scope.birdVelocity += $scope.birdAccerlator;
        $scope.birdPosition = {top: $scope.birdPosition.top + $scope.birdVelocity, left:550};
        if($scope.birdPosition.top+120 > screenHeight)
        {
            //alert('you die');
            // $scope.birdPosition = {top: 150, left: 550};
            if($interval.cancel(gameStartInterval)){
                $scope.birdVelocity = 0;
                $scope.gameStatus = gameStatusArr[2];
            }
        }
    };

    $scope.start = function(){
        gameStartInterval = $interval(function(){
            $scope.setPosition();
            $scope.setPipePosition();
        }, 15);
    };

    $scope.init = function(){
        $scope.gameStatus = gameStatusArr[0];
        $scope.initBird();
        $scope.initPipes();
    }

    $scope.initBird = function(){
        $scope.birdPosition = {top: 150, left: 550};
        $scope.birdVelocity = 0;
        $scope.birdAccerlator = 0.3;
    }

    $scope.initPipes = function(){
        if($scope.pipes === undefined){
            $scope.pipes = [];
            $scope.pipesBottom = [];
        }else{
            $scope.pipes.length = 0;
            $scope.pipesBottom.length = 0;
        }
        
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
