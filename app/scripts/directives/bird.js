'use strict';

angular.module('flappyBirdApp')
  .directive('bird', ['$document', function ($document) {
        var fly = function(element){

        };
    return {
      template: '<div class="flippyBird"></div>',
      restrict: 'EA',
      scope: {
        position: '=position',
        velocity: '=velocity'
      },
      link: function postLink(scope, element, attrs) {
          /**** bind space key event ****/
          $document.keyup(function(event){
              if(event.which === 32){
                  scope.velocity = -10;
                  //scope.position = {top: scope.position.top - 100, left: scope.position.left};
//                  element.offset({top: scope.position.top-20, left: scope.position.left});
                  scope.$digest();
              }
          });

          scope.$watch('position', function(){
              element.offset(scope.position);
//              console.log(element.position(), element.offset());
          });

      }
    };
  }]);
