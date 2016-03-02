'use strict';

describe('Checkout App', function() {

  it('should redirect index.html to index.html#/checkout', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/checkout');
      });
  });


  describe('checkout view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/checkout');
    });


    it('should save 3 yuan when buy 3 coca-cola which is set buy 3 get 1 free', function() {

      var totalSave = element(by.binding('totalSave'));
      var input = element(by.model('item.barcode'));
      var addButton = element(by.css('#add-items'));
      var printButton = element(by.css('#print-receipt'));

      input.clear();
      input.sendKeys('ITEM000001-3');
      addButton.click();
      printButton.click();
      expect(totalSave.getText()).toMatch(3);
    });

  });

});
