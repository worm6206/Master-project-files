'use strict';

describe('Controller: MdsprCtrl', function () {

  // load the controller's module
  beforeEach(module('musicApp'));

  var MdsprCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MdsprCtrl = $controller('MdsprCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MdsprCtrl.awesomeThings.length).toBe(3);
  });
});
