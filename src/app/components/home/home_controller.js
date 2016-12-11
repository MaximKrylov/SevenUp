'use strict';

angular.module('SevenUp')
    .controller('HomeController', ['$scope', function ($scope, LexicalScanner) {
        $scope.Perform = function () {
            var result = LexicalScanner.GetTokens($scope.ProgramCode);

            $scope.RecognizedTokens = result.RecognizedTokens;
            $scope.UnknownTokens = result.UnknownTokens;
        };
    }]);
