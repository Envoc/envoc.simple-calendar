# ng-simple-calendar

```
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

```
<simple-calendar date="date" events="{{events}}"></simple-calendar>
```

![simple calendar](http://i.imgur.com/xLEgPLr.png)
