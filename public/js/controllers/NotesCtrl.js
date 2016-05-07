'use strict';

/* NOTE Controllers */

angular.module('peckbox')
  .controller('NotesCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.note = {};


    $scope.createNote = function(user) {
     
        var config = {
            userId: user._id,
            body  : $scope.note.body
        };
        console.log(config);
        $http.post('/api/notes', config)
        .success(function(response){
            console.log('response', response);
             $scope.user.notes.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

    $scope.editNote = function(note){
        $scope.note = {
            userId: note.userId[0],
            _id: note._id,
            body: note.body
        };
        console.log('edit', $scope.note);
    };

    $scope.updateNote = function(note){
       console.log('update', note)
       $http.put('/api/notes/'+ note._id, note)
       .success(function(response){
         console.log(response)
         note.editForm = false;
       });
     };

    $scope.deleteNote = function(note) {
      $http.delete('/api/notes/' + note._id)
        .success(function(data) {
          var index = $scope.user.notes.indexOf(note);
          $scope.user.notes.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

 
 }]);


