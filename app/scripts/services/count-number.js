'use strict';

/**
 * @ngdoc service
 * @name webApp.countNumber
 * @description
 * # countNumber
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('CountNumber', function (API_URL, $http) {
    var RESOURCE_URL = API_URL + "/count_numbers"

    return {
      index: index,
      save: save,
    };

    function index() {
      return $http.get(RESOURCE_URL)
    }

    function save(number) {
      return $http.post(RESOURCE_URL, {count_number: number})
    }
  });
