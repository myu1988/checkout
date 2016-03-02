'use strict';

/* Services */

var itemServices = angular.module('itemServices', ['ngResource']);

itemServices.factory('Item', ['$resource',
  function($resource){
    return $resource('goods/:good.json', {}, {
      query: {method:'GET', params:{good:'goods'}, isArray:true}
    });
  }]);