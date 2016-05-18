'use strict';

/* Event Controller */

angular.module('peckbox')
  .controller('EventsCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.event = {};

    

    $scope.createEvent = function(user) {
     
        var body = {
            title : $scope.event.title,
            description  : $scope.event.description,
            location : $scope.event.location,
            date : $scope.event.date,
            userId: user._id,
        };
        console.log("front is", body);
        $http.post('/api/events', body)
        .success(function(response){
            toastr.success('You have successfully created an event!');
            console.log('response', response);
             $scope.user.events.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

    $scope.editEvent = function(event){
        $scope.event = {
            title : $scope.event.title,
            description  : $scope.event.description,
            location : $scope.event.location,
            date : $scope.event.date,
            userId: user._id,
        };
        console.log('edit', $scope.event);
    };

    $scope.updateEvent = function(event){
       console.log('update', event)
       $http.put('/api/events/'+ event._id, event)
       .success(function(response){
         toastr.success('You have successfully updated an event!');
         console.log(response)
         event.editForm = false;
       });
       // console.log('edit', event);
     };

   // $scope.createEvent = function() {
   //    console.log('scope.event is ', $scope.event);
   //    $scope.event.owner = $scope.currentUser;
   //    var event = new Event($scope.event);
   //    event.$save(function(data) {
   //      $scope.events.unshift(data);
   //      $scope.event = {};
   //      console.log('after save createEventForm is: ', $scope.createEvent);
   //    });
   // };

    $scope.deleteEvent = function(event) {
      $http.delete('/api/events/' + event._id)
        .success(function(data) {
          toastr.success('You have successfully deleted an event!');
          var index = $scope.user.events.indexOf(event);
          $scope.user.events.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };


  }]);


