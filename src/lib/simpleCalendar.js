/*global require */

var Calendar = require('calendar-base').Calendar;

function simpleCalendarDirective() {
  return {
    restrict: 'EA',
    template: require('html!./calendar.tmpl.html'),
    scope: {
      'date': '=',
      'events': '@'
    },
    controller: simpleCalendarCtrl,
    controllerAs: 'calendar',
    bindToController: true,
    link: function postLink(scope, iElement, iAttrs, ctrl) {
      ctrl.init(iElement);
    }
  };
}

function simpleCalendarCtrl($scope, $element, $attrs, $transclude) {
  var vm = this;
  var cal = new Calendar({ siblingMonths: true });

  vm.init = init;

  function init() {
    vm.date = vm.date || new Date();
    vm.events = getEvents();
    $scope.$watch(getDate, function() {
      updateCalendar(vm.date);
    });
  }

  function getDate() {
    return vm.date;
  }

  function getEvents() {
    return $scope.$eval(vm.events) || [];
  }

  function updateCalendar(date) {
    var args = getDateArgs(new Date(date));
    vm.days = cal.getCalendar.apply(cal, args);
    vm.days.forEach(mapEvents.bind(null, getEvents()));
    vm.weeks = segment(vm.days, 7);
  }

  function mapEvents(events, day) {
    var dayEvents = events.filter(function(e) {
      var date = new Date(e.date);
      var args = getDateArgs(date);
      var match = (args[0] === day.year &&
        args[1] === day.month &&
        args[2] === day.day);
      return match;
    });
    day.events = dayEvents;
  }

  function getDateArgs(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()];
  }

  function segment(collection, groupSize) {

    var copy = collection.slice();
    var numGroups = (copy.length / groupSize);
    var groups = [];

    for (var i = 0; i < numGroups; i++) {
      groups.push(copy.splice(0, groupSize));
    }

    return groups;
  }
}

module.exports = simpleCalendarDirective;
