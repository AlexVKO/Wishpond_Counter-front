'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function ($interval, CountNumber, DataHelpers) {
    var vm             = this,
        startCounterAt = 10;

    /*----------  Variable view  ----------*/
    angular.extend(vm, {
      numbers: [],
      currentCountNumber: null,

      // fn's
      saveNumber: saveNumber,
      destroyNumber: destroyNumber,
      destroyAllNumbers: destroyAllNumbers,
    })

    // Init
    function init() {
      CountNumber.index().then(function(res) {
        vm.numbers = res.data;
        _initCounter();
      })
    }

    /*----------  Publics  ----------*/
    function saveNumber(number, index) {
      var index = index || vm.numbers.length;
      vm.numbers[index] = {number: number};

      CountNumber.save(number)
        .then(function(res) {
          vm.numbers[index] = res.data;
        },function(res) {
          vm.numbers[index] = angular.extend(
            vm.numbers[index],
            { errorMessage: res.data }
          );
        })
    }

    function destroyNumber(id) {
      CountNumber.destroy(id).then(function() {
        vm.numbers = DataHelpers.removeByID(vm.numbers, id);
      })
    }

    function destroyAllNumbers() {
      CountNumber.destroyAll().then(function() {
        vm.numbers = [];
      })
    }

    /*----------  Privates  ----------*/
    function _initCounter() {
      $interval(function () {
        if (vm.currentCountNumber > 1) {
          vm.currentCountNumber--;
        } else {
          vm.currentCountNumber = startCounterAt;
        }
      }, 1000);
    };

    init();
  });


