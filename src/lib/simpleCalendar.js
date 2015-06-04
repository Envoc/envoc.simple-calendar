/*global angular, require */

var Calendar = require('calendar-base').Calendar;
var calendarTemplate = require('html!./calendar.tmpl.html');

/* @ngInject */
function simpleCalendarDirective($compile) {
  return {
    restrict: 'EA',
    scope: {
      'date': '=',
      'events': '='
    },
    controller: simpleCalendarCtrl,
    controllerAs: 'calendar',
    bindToController: true,
    transclude: true,
    link: function postLink(scope, iElement, iAttrs, ctrl, transcludeFn) {
      transcludeFn(scope, function(transcludedContent){
        var directiveTemplateBuilder = angular.element(calendarTemplate);

        var dayRoot = directiveTemplateBuilder
          .querySelectorAll('.simple-calendar-day')
          .append(transcludedContent);

        var dayTemplateEl = directiveTemplateBuilder.querySelectorAll('simple-calendar-day');
        var events = directiveTemplateBuilder.querySelectorAll('simple-calendar-event');
        var dayTemplateBuilder = angular.element('<div />');

        dayTemplateBuilder.append(dayTemplateEl.html() || '{{$day.day}}');

        if (events.length){
          var eventTemplate = angular
            .element('<div class="simple-calendar-event" />')
            .attr('ng-repeat', '$event in $day.events')
            .attr('ng-click', 'calendar.onEventClick($day.events[$index], $day); $event.stopPropagation();')
            .html(events.html());

          dayTemplateBuilder.append(eventTemplate);
        }

        dayRoot.empty().append(dayTemplateBuilder);
        iElement.append($compile(directiveTemplateBuilder)(scope));
      });
      ctrl.init(iElement);
    }
  };
}

/* @ngInject */
function simpleCalendarCtrl($scope, $element, $attrs, simpleCalendarConfig) {
  var vm = this;
  var cal_opts = angular.extend(simpleCalendarConfig, {siblingMonths: true});
  var cal = new Calendar(cal_opts);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var start = days.splice(simpleCalendarConfig.weekStart);

  vm.weekdays = start.concat(days);
  vm.init = init;
  vm.onDayClick = simpleCalendarConfig.onDayClick || function(){};
  vm.onEventClick = simpleCalendarConfig.onEventClick || function(){};

  function init() {
    vm.date = vm.date || new Date();
    vm.events = getEvents().slice();

    $scope.$watchCollection(getEvents, function() {
      updateCalendar(vm.date);
    });

    $scope.$watch(getDate, updateCalendar);
  }

  function getDate() {
    return vm.date;
  }

  function getEvents() {
    return vm.events || [];
  }

  function updateCalendar(date) {
    var args = getDateArgs(new Date(date));
    vm.days = cal.getCalendar.apply(cal, args);
    vm.days.forEach(mapEvents.bind(null, vm.events));
    vm.weeks = segment(vm.days, 7);
  }

  function mapEvents(events, day) {
    day.events = events.filter(function(e) {
      var args = getDateArgs(new Date(e.date));
      var match = (args[0] === day.year &&
        args[1] === day.month &&
        args[2] === day.day);
      return match;
    });
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
