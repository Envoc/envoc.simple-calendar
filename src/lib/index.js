/*global angular, require */

var simpleCalendar = require('./simpleCalendar');

if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

var simpleCalendarConfig = Object.create(null);
simpleCalendarConfig.weekStart = 0;

angular
  .module('envoc.simpleCalendar', [])
  .constant('simpleCalendarConfig', simpleCalendarConfig)
  .directive('simpleCalendar', simpleCalendar);
