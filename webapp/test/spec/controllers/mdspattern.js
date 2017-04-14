'use strict';

describe('Controller: MdspatternCtrl', function () {

  // load the controller's module
  beforeEach(module('musicApp'));

  var MdspatternCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MdspatternCtrl = $controller('MdspatternCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MdspatternCtrl.awesomeThings.length).toBe(3);
  });
});
