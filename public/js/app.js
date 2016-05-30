'use strict';

// Declare app level module which depends on filters, and services
angular.module('peckbox', ['peckbox.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'google.places',
                              '720kb.datepicker',
                              'ngMap',
                              'sticky',
                              'toastr',
                              'angular-loading-bar',
                              ])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash',
        controller: 'ApisCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'UsersCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'UsersCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'NotesCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'PostsCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'EventsCtrl'
      });

      $routeProvider.when('/navbar', {
        templateUrl: 'templates/navbar',
        controller: 'UsersCtrl'
      });

      $routeProvider.when('/posts', {
        templateUrl: 'templates/post',
        controller: 'PostsCtrl'
      });

      $routeProvider.when('/notes', {
        templateUrl: 'templates/note',
        controller: 'NotesCtrl'
      });

      $routeProvider.when('/events', {
        templateUrl: 'templates/event',
        controller: 'EventsCtrl'
      });

      $routeProvider.when('/posts/:id/comments', {
        templateUrl: 'templates/postShow',
        controller: 'PostsCtrl'
      });

      $routeProvider.when('/posts/:id/comments', {
        templateUrl: 'templates/postShow',
        controller: 'PostShowCtrl'
      });

      $routeProvider.when('/notes/:id/comments', {
        templateUrl: 'templates/noteShow',
        controller: 'NotesCtrl'
      });

      $routeProvider.when('/notes/:id/comments', {
        templateUrl: 'templates/noteShow',
        controller: 'NoteShowCtrl'
      });

      $routeProvider.when('/events/:id/comments', {
        templateUrl: 'templates/eventShow',
        controller: 'EventsCtrl'
      });

      $routeProvider.when('/events/:id/comments', {
        templateUrl: 'templates/eventShow',
        controller: 'EventShowCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }])

    

     .config(function($authProvider, $windowProvider) {
      var $window = $windowProvider.$get();
      if ($window.location.host == 'localhost:1337') {
        console.log('development app');
        $authProvider.facebook({        
          clientId: '1603892236604415',
        });
        $authProvider.google({
          clientId: '443314981286-hij2tse2619ppccl6ar7qom10jt3ci0p.apps.googleusercontent.com',
        });
      } else {
        console.log('production app');
        $authProvider.facebook({        
          clientId: '1603892236604415',
        });
        $authProvider.google({
          clientId: '443314981286-hij2tse2619ppccl6ar7qom10jt3ci0p.apps.googleusercontent.com',
        });
      }
    
    });
