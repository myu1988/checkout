'use strict';

var checkoutControllers = angular.module('checkoutControllers', []);

checkoutControllers.controller('CheckoutCtrl', ['$scope', 'Item', 
  function($scope, Item) {

    $scope.items = Item.query();

    $scope.item = {
      barcode:'',
      code:'',
      name:'',
      quantity:1,
      price:0.00,
      sale:{
        buy3Get1Free:false,
        fivePercentOff:false
      },
      promotion:'/',
      subtotal:0.00,
      save:0.00,
      unit:''
    };

    $scope.totalCost = 0.00;

    $scope.totalSave = 0.00;

    $scope.itemsForShow = [];

    $scope.itemsBuy3Get1Free = [];

    $scope.addItemToShow = function(){
      addItem();
      calMoney();
      calTotal();
    };

    function addItem() {
      var arr = $scope.item.barcode.split('-');
      $scope.item.code = arr[0];
      if(arr[1]){
        $scope.item.quantity = arr[1];
      }else{
        $scope.item.quantity = 1;
      }
      var item = getItem($scope.item.code);
      if(angular.isDefined(item.name)){
        for(var i = 0; i < $scope.itemsForShow.length; i++){
          if($scope.itemsForShow[i].name == item.name){
            $scope.itemsForShow[i].quantity = Decimal.add($scope.itemsForShow[i].quantity,$scope.item.quantity).toNumber();
            return;
          }
        }
        $scope.item.name = item.name;
        $scope.item.sale = item.sale;
        $scope.item.price = item.price;
        $scope.item.unit = item.unit;
        if($scope.item.sale.buy3Get1Free){
          $scope.item.promotion = "买二赠一";
        }else if($scope.item.sale.fivePercentOff){
          $scope.item.promotion = "95折";
        }else{
          $scope.item.promotion = "/";
        }
        $scope.itemsForShow.push(angular.copy($scope.item));
      }else{
        alert('没有该商品，请确认条码是否正确');  
      }
    }

    function calMoney() {
      for(var i = 0; i < $scope.itemsForShow.length; i++){
        if($scope.itemsForShow[i].sale.buy3Get1Free){
          $scope.itemsForShow[i].subtotal = Decimal.mul($scope.itemsForShow[i].price, Decimal.sub($scope.itemsForShow[i].quantity, Decimal.div($scope.itemsForShow[i].quantity,3).floor())).toNumber();
        }else if($scope.item.sale.fivePercentOff){
          $scope.itemsForShow[i].subtotal = Decimal.mul($scope.itemsForShow[i].price,$scope.itemsForShow[i].quantity).mul(0.95).toNumber();
        }else{
          $scope.itemsForShow[i].subtotal = Decimal.mul($scope.itemsForShow[i].price,$scope.itemsForShow[i].quantity).toNumber();
        }
        $scope.itemsForShow[i].save = Decimal.mul($scope.itemsForShow[i].price,$scope.itemsForShow[i].quantity).sub($scope.itemsForShow[i].subtotal).toNumber();
      }
    }

    function calTotal() {
      $scope.totalCost = 0.00;
      $scope.totalSave = 0.00;
      for(var i = 0; i < $scope.itemsForShow.length; i++){
        $scope.totalCost = Decimal.add($scope.totalCost,$scope.itemsForShow[i].subtotal).toNumber();
        $scope.totalSave = Decimal.add($scope.totalSave,$scope.itemsForShow[i].save).toNumber();
      }
    }

    function getItemsBuy3Get1Free() {
      $scope.itemsBuy3Get1Free = [];
      for(var i = 0; i < $scope.itemsForShow.length; i++){
        if($scope.itemsForShow[i].sale.buy3Get1Free && $scope.itemsForShow[i].save != 0){
          $scope.itemsBuy3Get1Free.push(angular.copy($scope.itemsForShow[i]));
          $scope.showBuy3Get1Free = true;
        }  
      }
    } 

    $scope.showReceipt = false;

    $scope.showBuy3Get1Free = false;

    $scope.showBg = false;

    $scope.printReceipt = function(){
      $scope.showReceipt = true;
      $scope.showBg = true;
      getItemsBuy3Get1Free();
    };

    $scope.closeReceipt = function(){
      $scope.showReceipt = false;
      $scope.showBg = false;
      history.go(0);
    };

    function getItem (code) {
      for(var i = 0; i < $scope.items.length; i++){
        if($scope.items[i].code == code){
          return $scope.items[i];
        }  
      }
      return [];
    }

  }]);
