# ng-simple-calendar

`app.module('foo', ['ngSimpleCalendar'])`

```javascript
app.controller('MainCtrl', function($scope) {
    $scope.events = [
        {
            name: 'foo',
            date: '5-2-15'
        },
        {
            name: 'bar',
            date: new Date()
        }
    ];
});
```

```javascript
<simple-calendar date="date" events="events"></simple-calendar>

// or

<simple-calendar date="date" events="events">
  <simple-calendar-day>{{$day.day}}</simple-calendar-day> <!-- optional -->
  <simple-calendar-event>{{$event.name}}</simple-calendar-event> <!-- optional -->
</simple-calendar>
```

* The calendar simply displays the month of the `date` is it bound to. 
* Adds a `has-events` class on days with events if you pass in an event collection
* Does not implement month title or next/prev. You can accomplish this by showing the date it is bound to or manuipulating the bound date. See demo for example.
* If you care to display the events, you can include the `simple-calendar-event` referenced above

[Demo](http://plnkr.co/edit/QdSOd35vyFqBD07D9QNF?p=preview)

![simple calendar](http://i.imgur.com/xLEgPLr.png)

