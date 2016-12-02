'use strict';

angular.module('SevenUp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeController'
            })
            .otherwise({ redirectTo: "/home" });
    }]);
