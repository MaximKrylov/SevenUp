'use strict';

angular.module('SevenUp')
    .controller('HomeController', ['$scope', function($scope) {
        $scope.Name = 'SevenUp v1.0';
        $scope.Description = 'Simple programming language...';
    }]);
