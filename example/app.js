/*global angular */

var app = angular.module('plunker', ['envoc.simpleCalendar']);

app.controller('MainCtrl', function($scope, simpleCalendarConfig) {
  simpleCalendarConfig.weekStart = 1;
  simpleCalendarConfig.onDayClick = onDayClick;
  simpleCalendarConfig.onEventClick = onEventClick;

  $scope.date = new Date();
  $scope.events = [{
    name: 'foo',
    date: '5-2-15'
  }, {
    name: 'bar',
    date: new Date()
  }, {
    name: 'bar foo',
    date: new Date()
  }, {
    name: 'baz',
    date: '6-12-15'
  }];

  $scope.changeMonth = changeMonth;
  $scope.monthName = monthName;

  function onDayClick(day){
    console.log(day);
  }

  function onEventClick(event, day){
    console.log(event, day);
  }

  function monthName(date) {
    var d = new Date(date);
    var months = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];
    return months[d.getMonth()];
  }

  function changeMonth(offset) {
    var d = new Date($scope.date);
    $scope.date = d.setMonth(d.getMonth() + offset);
  }
});
