'use strict';

angular.module('flappyBirdApp')
  .directive('bird', ['$document', function ($document) {
        var fly = function(element){

        };
    return {
      template: '<div style="border:solid; border-width: 3px; width:30px; height: 30px"></div>',
      restrict: 'EA',
      scope: {
        position: '=position'
      },
      link: function postLink(scope, element, attrs) {
          /**** bind space key event ****/
          $document.keyup(function(event){
              if(event.which === 32){
                  scope.position = {top: scope.position.top-20, left: scope.position.left};
//                  element.offset({top: scope.position.top-20, left: scope.position.left});
                  scope.$digest();

              }
          });

          scope.$watch('position', function(){
              element.offset(scope.position);
              console.log(element.position(), element.offset());
          });

      }
    };
  }]);
