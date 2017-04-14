'use strict';

describe('Controller: SubCtrl', function () {

  // load the controller's module
  beforeEach(module('musicApp'));

  var SubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubCtrl = $controller('SubCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubCtrl.awesomeThings.length).toBe(3);
  });
});
