// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var bellApp = angular.module('bellApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

bellApp.service("PullingRefreshPressed",['$http',PullingRefreshPressed]);

bellApp.controller('bellController',['$scope','PullingRefreshPressed',bellController]);

function bellController($scope,PullingRefreshPressed){
    $scope.posts = [];
    $scope.refresh = function(){
        PullingRefreshPressed.getPosts($scope);
    }
}

function PullingRefreshPressed($http){
    this.getPosts = function($scope){
        $http.jsonp('myURL').success(function(result){
            $scope.posts = result.posts;
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
}