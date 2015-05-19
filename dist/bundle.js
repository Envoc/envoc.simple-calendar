/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*global angular, require */

	var simpleCalendar  = __webpack_require__(1);
	angular
	  .module('ngSimpleCalendar', [])
	  .directive('simpleCalendar', simpleCalendar);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*global require */

	var Calendar = __webpack_require__(3).Calendar;

	function simpleCalendarDirective() {
	  return {
	    restrict: 'EA',
	    template: __webpack_require__(2),
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<table class=\"simple-calendar\">\r\n    <thead>\r\n        <tr>\r\n            <td>Su</td>\r\n            <td>Mo</td>\r\n            <td>Tu</td>\r\n            <td>We</td>\r\n            <td>Th</td>\r\n            <td>Fr</td>\r\n            <td>Sa</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr ng-repeat=\"week in calendar.weeks\">\r\n            <td ng-repeat=\"day in week\" ng-class=\"{\r\n            'sibling-month': day.siblingMonth,\r\n            'has-events': day.events.length\r\n            }\">\r\n                {{day.day}}\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	function Calendar ( options ) {
		options = options || {};

		this.startDate = options.startDate;
		this.endDate = options.endDate;
		this.maxInterval = options.maxInterval;
		this.maxConstraint = options.maxConstraint;
		this.siblingMonths = options.siblingMonths;
		this.weekStart = options.weekStart;

		if ( this.weekStart === undefined ) {
			this.weekStart = 0;
		}

		this.date = new Date( 1986, 9, 14, 0, 0, 0 );
	}

	Calendar.prototype.getCalendar = function ( year, month ) {
		this.date.setUTCFullYear( year );
		this.date.setUTCMonth( month );
		this.date.setUTCDate( 1 );

		var calendar = [],
			firstDay = this.date.getUTCDay(),
			firstDate = - ( ( ( 7 - this.weekStart ) + firstDay ) % 7 ),
			lastDate = Calendar.daysInMonth( year, month ),
			lastDay = ( ( lastDate - firstDate ) % 7 ),
			lastDayLastMonth = Calendar.daysInMonth( year, month - 1 ),
			i = firstDate,
			max = ( lastDate - i ) + ( lastDay != 0 ? 7 - lastDay : 0 ) + firstDate,
			currentDay,
			currentDate,
			currentDateObject,
			otherMonth,
			otherYear;

		while ( i < max ) {
			currentDate = i + 1;
			currentDay = ( ( i < 1 ? 7 + i : i ) + firstDay ) % 7;
			if ( currentDate < 1 || currentDate > lastDate ) {
				if ( this.siblingMonths ) {
					if ( currentDate < 1 ) {
						otherMonth = month - 1;
						otherYear = year;
						if ( otherMonth < 0 ) {
							otherMonth = 11;
							otherYear --;
						}
						currentDate = lastDayLastMonth + currentDate;
					}
					else if ( currentDate > lastDate ) {
						otherMonth = month + 1;
						otherYear = year;
						if ( otherMonth > 11 ) {
							otherMonth = 0;
							otherYear ++;
						}
						currentDate = i - lastDate + 1;
					}
					currentDateObject = {
						day: currentDate,
						weekDay: currentDay,
						month: otherMonth,
						year: otherYear,
						siblingMonth: true
					};
				}
				else {
					currentDateObject = false;
				}
			}
			else {
				currentDateObject = {
					day: currentDate,
					weekDay: currentDay,
					month: month,
					year: year
				};
			}

			if ( currentDateObject && this.startDate ) {
				currentDateObject.selected = this.isDateSelected( currentDateObject );
			}

			calendar.push( currentDateObject );
			i ++;
		}

		return calendar;
	};

	Calendar.prototype.isDateSelected = function ( date ) {
		if ( date.year == this.startDate.year && date.month == this.startDate.month && date.day == this.startDate.day ) {
			return true;
		}
		else if ( this.endDate ) {
			if ( date.year == this.startDate.year && date.month == this.startDate.month && date.day < this.startDate.day ) {
				return false;
			}
			else if ( date.year == this.endDate.year && date.month == this.endDate.month && date.day > this.endDate.day ) {
				return false;
			}
			else if ( date.year == this.startDate.year && date.month < this.startDate.month ) {
				return false;
			}
			else if ( date.year == this.endDate.year && date.month > this.endDate.month ) {
				return false;
			}
			else if ( date.year < this.startDate.year ) {
				return false;
			}
			else if ( date.year > this.endDate.year ) {
				return false;
			}
			return true;
		}
		return false;
	};

	Calendar.prototype.setStartDate = function ( date ) {
		this.startDate = date;
	};

	Calendar.prototype.setEndDate = function ( date ) {
		this.endDate = date;
	};

	Calendar.prototype.setDate = Calendar.prototype.setStartDate;

	Calendar.interval = function ( date1, date2 ) {
		var oDate1 = new Date( 1986, 9, 14, 0, 0, 0 ), oDate2 = new Date( 1986, 9, 14, 0, 0, 0 );

		oDate1.setUTCFullYear( date1.year );
		oDate1.setUTCMonth( date1.month );
		oDate1.setUTCDate( date1.day );

		oDate2.setUTCFullYear( date2.year );
		oDate2.setUTCMonth( date2.month );
		oDate2.setUTCDate( date2.day );

		return Math.abs( Math.ceil( ( oDate2.getTime() - oDate1.getTime() ) / 86400000 ) ) + 1;
	};

	Calendar.daysInMonth = function ( year, month ) {
		// -1? It's December if considering January - 1!
		if ( month == -1 || month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11 ) {
			return 31;
		}
		else if ( month == 3 || month == 5 || month == 8 || month == 10 ) {
			return 30;
		}
		else if ( month == 1 ) {
			return 28 + Calendar.isLeapYear( year );
		}
	};

	Calendar.isLeapYear = function ( year ) {
		return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
	}

	module.exports = { Calendar: Calendar };

/***/ }
/******/ ]);