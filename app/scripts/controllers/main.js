'use strict';

angular.module('angprez2App')
  .controller('MainCtrl', function ($scope, $document, $http, $log) {
    $scope.slideIndex = 0;

    $scope.now = new Date();

    $http.get("/data/slides.json").success(function(data) {
      $scope.slides = data;
    }).error(function(data) {
      $log.error("data error");
    });

    $scope.nextSlide = function() {
      $scope.slideIndex++;
    };

    $scope.previousSlide = function() {
      $scope.slideIndex--;
    };

    $scope.currentSlide = function() {
      return $scope.slides[$scope.slideIndex].content;
    };

    $scope.gotoSlide = function(s) {
      $scope.slideIndex = $scope.slides.indexOf(s);
    };

    $scope.addSlide = function(t, c) {
      $scope.slides.push({
        title : t,
        content : c
      });
    };

    $document.keydown(function(event) {
      if (event.keyCode == 37) {
        $scope.previousSlide();
        $scope.$apply();
      } else if (event.keyCode == 39) {
        $scope.nextSlide();
        $scope.$apply();
      }
    });

  });
