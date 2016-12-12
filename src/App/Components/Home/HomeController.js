'use strict';

angular.module('SevenUp')
    .controller('HomeController', ['$scope', 'LexicalScanner', function ($scope, LexicalScanner) {
        $scope.Perform = function () {
            var temp = LexicalScanner.GetTokens($scope.ProgramCode);

            $scope.RecognizedTokens = temp.RecognizedTokens;
            $scope.UnknownTokens = temp.UnknownTokens;
        };
    }]);
