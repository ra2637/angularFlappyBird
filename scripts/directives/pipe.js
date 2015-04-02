'use strict';

angular.module('flappyBirdApp')
  .directive('pipe', function () {
    return {
      template: '<div style="width:80px"></div>',
      restrict: 'EA',
      scope:{
          height: '=',
          position: '='
      },
      link: function postLink(scope, element, attrs) {
        angular.element(element[0].firstChild).css('height', scope.height);
        scope.$watch('position', function(){
            element.offset(scope.position);
            // console.log(element.position(), element.offset());
        }, true);
      }
    };
  });
