'use strict';

describe('Directive: bird', function () {

  // load the directive's module
  beforeEach(module('flappyBirdApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bird></bird>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bird directive');
  }));
});
