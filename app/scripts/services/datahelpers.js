'use strict';

/**
 * @ngdoc service
 * @name webApp.DataHelpers
 * @description
 * # DataHelpers
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('DataHelpers', function () {

    return {
      removeByID: removeByID
    };

    // public
    function removeByID (list, ID) {
      var i = _getIndexByID(list, ID);
      list.splice(i,1);
      return list;
    }

    // pivate
    function _getIndexByID (list, ID) {
      var i;
      angular.forEach(list, function (value, key) {
        if (value.id === ID) {
          i = key;
        }
      });
      return i;
    }

  });
