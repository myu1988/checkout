'use strict';

describe('Checkout controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('checkoutApp'));
  beforeEach(module('itemServices'));

  describe('CheckoutCtrl', function(){
    var scope, ctrl, $httpBackend;

    var items = [
    {
      "code": "ITEM000001", 
      "name": "可口可乐", 
      "sale": {
        "buy3Get1Free": true,
        "fivePercentOff": true
      }, 
      "price": 3.00,
      "unit":"瓶"
    }, 
    {
      "code": "ITEM000002", 
      "name": "羽毛球", 
      "sale": {
        "buy3Get1Free": true,
        "fivePercentOff": false
      }, 
      "price": 1.00,
      "unit":"个"
    }, 
    {
      "code": "ITEM000003", 
      "name": "苹果", 
      "sale": {
        "buy3Get1Free": false,
        "fivePercentOff": true
      }, 
      "price": 5.50,
      "unit":"斤"
    }
    ]

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('goods/goods.json').respond(items);

      scope = $rootScope.$new();
      ctrl = $controller('CheckoutCtrl', {$scope: scope});
    }));


    it('should create "items" model with 3 goods fetched from xhr', function() {
      expect(scope.items).toEqualData([]);
      $httpBackend.flush();

      expect(scope.items).toEqualData(items);
    });

  });

});
