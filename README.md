# ng-simple-calendar

app.module('foo', ['ngSimpleCalendar'])

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

```html
<simple-calendar date="date" events="events"></simple-calendar>
```

[Demo](http://plnkr.co/edit/QdSOd35vyFqBD07D9QNF?p=preview)

![simple calendar](http://i.imgur.com/xLEgPLr.png)

*todo*

```javascript
<simple-calendar date="date" events="events">
  <simple-calendar-day>{{$day.day}}</simple-calendar-day>
</simple-calendar>
```
