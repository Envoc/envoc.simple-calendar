/*global angular, require */

var simpleCalendar  = require('./simpleCalendar');
angular
  .module('ngSimpleCalendar', [])
  .directive('simpleCalendar', simpleCalendar);
