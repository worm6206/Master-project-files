'use strict';

describe('Controller: MdsCtrl', function () {

  // load the controller's module
  beforeEach(module('musicApp'));

  var MdsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MdsCtrl = $controller('MdsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MdsCtrl.awesomeThings.length).toBe(3);
  });
});
