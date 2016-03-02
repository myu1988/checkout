'use strict';

/* App Module */

var checkoutApp = angular.module('checkoutApp', [
  'ngRoute',
  'checkoutControllers',
  'itemServices'
]);

checkoutApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/checkout', {
        templateUrl: 'partials/checkout.html',
        controller: 'CheckoutCtrl'
      }).
      otherwise({
        redirectTo: '/checkout'
      });
  }]);
