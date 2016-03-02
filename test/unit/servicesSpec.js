'use strict';

describe('service', function() {

  beforeEach(module('checkoutApp'));

  it('check the existence of Item factory', inject(function(Item) {
      expect(Item).toBeDefined();
    }));
});