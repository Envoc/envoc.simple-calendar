/*global angular, require */

var simpleCalendar = require('./simpleCalendar');

if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

angular
  .module('envoc.simpleCalendar', [])
  .directive('simpleCalendar', simpleCalendar);
