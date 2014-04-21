'use strict';

angular.module('flappyBirdApp')
  .controller('MainCtrl', ['$scope','$interval', '$document', function ($scope,$interval, $document) {
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    var containerPosition = angular.element(document.getElementsByClassName('gameContainer')).position();
    var gameStartInterval;
    var gameStatusArr = ['prepare', 'start', 'dead'];
    var safeHeight = 170;
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
        if($scope.birdPosition.top < 0){
            $scope.birdPosition.top = 0;
        }

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
            if($scope.collisionDetect())
            {
                console.log('collision and die');
            }
        }, 15);
    };


    $scope.collisionDetect = function(){
        $scope.birdPosition;
        var birdTop = $scope.birdPosition.top +130;//+ $scope.birdPosition.height;
        var birdBottom = $scope.birdPosition.top;
        var birdLeft = $scope.birdPosition.left;
        var birdRight = $scope.birdPosition.left + 200;//$scope.birdPosition.width;
        for(var i=0; i<$scope.pipes.length; i++){
            var pipe = $scope.pipes[i];
            var pipeTop = pipe.position.top + pipe.height;
            var pipeBottom = pipe.position.top;
            var pipeLeft = pipe.position.left;
            var pipeRight = pipe.position.left + 80;//pipe.width;
            if( !((birdBottom > pipeTop) || 
                (birdTop < pipeBottom) || 
                (birdLeft > pipeRight) ||
                (birdRight < pipeLeft) )) {
                return true;
            }else {
                return false;
            }
        }
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
        
            var pipes = createPipe();
            $scope.pipes.push(pipes.topPipe);
            $scope.pipesBottom.push(pipes.bottomPipe);
        // for(var i=0; i<1; i++){
        //     $scope.pipes.push(createPipe(i));
        //     $scope.pipesBottom.push(createPipe(i));
        // }
    }

    var createPipe = function(){
        var h = generatePipeHeight(100, 250);
        return {
            topPipe:{
                height: h,
                position: {
                    // top: 0,
                    left: (screenWidth-700)/2+700
                }    
            },
            bottomPipe:{
                height: screenHeight-h-safeHeight,
                position: {
                    // top: 0,
                    left: (screenWidth-700)/2+700
                }    
            }
            
        }
    }

    var generatePipeHeight = function(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    $scope.setPipePosition = function(){
        for(var i=0; i<$scope.pipes.length; i++){
            var pipe = $scope.pipes[i];
            var pipeBottom = $scope.pipesBottom[i];
            // pipe.position.left = pipe.position.left - 5;
            pipe.position.left = pipe.position.left - 5;
            pipeBottom.position.left = pipeBottom.position.left - 5;

            if(i==$scope.pipes.length-1)
            {
                if((containerPosition.left+700-pipe.position.left) > 310){
                    var pipes = createPipe();
                    $scope.pipes.push(pipes.topPipe);
                    $scope.pipesBottom.push(pipes.bottomPipe);
                }
            }

            if(pipe.position.left+80 < containerPosition.left){
                $scope.pipes.shift();
                $scope.pipesBottom.shift();
            }
        }
    }



  }]);
