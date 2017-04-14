'use strict';

describe('Controller: RollCtrl', function () {

  // load the controller's module
  beforeEach(module('musicApp'));

  var RollCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RollCtrl = $controller('RollCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RollCtrl.awesomeThings.length).toBe(3);
  });
});
